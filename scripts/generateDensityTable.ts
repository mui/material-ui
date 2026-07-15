/* eslint-disable no-console, no-bitwise, no-new-func */
/**
 * Snapshots enhance{Compact,Normal,Comfort}Density into a checked-in EmitTarget
 * table beside the density playground. One-way, dev-only: the presets are the
 * source of truth; this never writes back. Run: `pnpm density:codegen`.
 *
 * Disposable with the playground — delete both and the library is untouched.
 */
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import {
  createTheme,
  enhanceCompactDensity,
  enhanceNormalDensity,
  enhanceComfortDensity,
} from '@mui/material/styles';

const PRESETS = {
  compact: enhanceCompactDensity,
  normal: enhanceNormalDensity,
  comfort: enhanceComfortDensity,
} as const;
type PresetName = keyof typeof PRESETS;
const PRESET_NAMES = Object.keys(PRESETS) as PresetName[];

const OUT = path.resolve(
  __dirname,
  '../docs/src/modules/components/density/emitTable.generated.ts',
);
const OUT_KNOBS = path.resolve(__dirname, '../docs/src/modules/components/density/densityKnobs.ts');

const DENSITY_VAR_RE = /^var\(--mui-density-([a-z]+)\)$/;
const isNestedSelectorKey = (k: string) => /[.&@:> ]/.test(k);
const NESTED_SEP = ' ';

// --- extraction (mirrors the playground's flattenLayers / matchesSample walk) ---

const flattenLayers = (node: unknown): Record<string, any>[] => {
  if (Array.isArray(node)) {
    return node.flatMap(flattenLayers);
  }
  return node && typeof node === 'object' ? [node as Record<string, any>] : [];
};

type RawLeaf = {
  component: string;
  slot: string;
  matcher: object | ((arg: { ownerState: any }) => boolean) | null;
  nested: string;
  prop: string;
  value: unknown;
  /** the leaf came from the component's theme defaultProps, not styleOverrides. */
  isDefaultProp?: boolean;
};

// Recurse a style object → leaf props, descending into nested-selector keys.
function collectLeaves(
  style: Record<string, any>,
  base: Omit<RawLeaf, 'prop' | 'value' | 'nested'>,
  nested: string,
  out: RawLeaf[],
): void {
  for (const [k, v] of Object.entries(style)) {
    if (k === 'variants') {
      continue;
    }
    if (isNestedSelectorKey(k) && v && typeof v === 'object') {
      collectLeaves(v, base, nested ? `${nested}${NESTED_SEP}${k}` : k, out);
      continue;
    }
    if (v && typeof v === 'object') {
      collectLeaves(v, base, nested ? `${nested}${NESTED_SEP}${k}` : k, out);
      continue;
    }
    out.push({ ...base, nested, prop: k, value: v });
  }
}

function extract(preset: PresetName): RawLeaf[] {
  const theme = PRESETS[preset](createTheme({ cssVariables: true }));
  const components = (theme as any).components ?? {};
  const out: RawLeaf[] = [];
  for (const component of Object.keys(components)) {
    const styleOverrides = components[component]?.styleOverrides ?? {};
    for (const slot of Object.keys(styleOverrides)) {
      for (const layer of flattenLayers(styleOverrides[slot])) {
        collectLeaves(layer, { component, slot, matcher: null }, '', out);
        if (Array.isArray(layer.variants)) {
          for (const variant of layer.variants) {
            collectLeaves(
              variant.style ?? {},
              { component, slot, matcher: variant.props },
              '',
              out,
            );
          }
        }
      }
    }
    // Theme defaultProps emissions (JS-gated seams, e.g. DataGrid heights) —
    // one row per primitive prop under the synthetic 'defaultProps' slot.
    const defaultProps = components[component]?.defaultProps ?? {};
    for (const [prop, value] of Object.entries(defaultProps)) {
      if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
        continue;
      }
      out.push({
        component,
        slot: 'defaultProps',
        matcher: null,
        nested: '',
        prop,
        value,
        isDefaultProp: true,
      });
    }
  }
  return out;
}

// --- ids & serialization ---

function hash6(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i += 1) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return (h >>> 0).toString(36).padStart(6, '0').slice(0, 6);
}

// Stable identity for a matcher across the three (template-identical) presets.
function matcherSlug(matcher: RawLeaf['matcher']): string {
  if (matcher === null) {
    return 'base';
  }
  if (typeof matcher === 'function') {
    return `fn:${hash6(matcher.toString().replace(/\s+/g, ' ').trim())}`;
  }
  return Object.keys(matcher)
    .sort()
    .map((k) => `${k}=${(matcher as Record<string, unknown>)[k]}`)
    .join(',');
}

const rowId = (l: RawLeaf) =>
  [l.component, l.slot, matcherSlug(l.matcher), l.nested, l.prop].join('|');

function leafKind(l: RawLeaf): 'cssProp' | 'privateVar' | 'defaultProp' {
  if (l.isDefaultProp) {
    return 'defaultProp';
  }
  return l.prop.startsWith('--') ? 'privateVar' : 'cssProp';
}

// Print a matcher as source for the generated .ts (functions verbatim, objects as literals).
function printMatcher(matcher: RawLeaf['matcher']): string {
  if (matcher === null) {
    return 'null';
  }
  if (typeof matcher === 'function') {
    return matcher.toString();
  }
  const entries = Object.entries(matcher).map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  return `{ ${entries.join(', ')} }`;
}

const compShort = (component: string) => component.replace(/^Mui/, '');

// Default label; overridden by the hand-maintained densityFields registry.
function synthLabel(l: RawLeaf): string {
  const parts = [compShort(l.component)];
  if (l.slot !== 'root') {
    parts.push(l.slot);
  }
  parts.push(l.prop);
  let hint = '';
  if (typeof l.matcher === 'function') {
    hint = 'fn';
  } else if (l.matcher !== null) {
    hint = Object.entries(l.matcher)
      .map(([k, v]) => `${k}=${v}`)
      .join(',');
  }
  const label = parts.join(' · ');
  return hint ? `${label} [${hint}]` : label;
}

// --- build merged rows across presets ---

type Row = {
  id: string;
  target: {
    component: string;
    slot: string;
    props: string;
    nested: string;
    kind: 'cssProp' | 'privateVar' | 'defaultProp';
    prop: string;
  };
  isDensity: boolean;
  densityKey: string | null;
  label: string;
  values: Record<PresetName, string>;
};

function buildRows(): Row[] {
  const byId = new Map<string, Row>();
  for (const preset of PRESET_NAMES) {
    for (const leaf of extract(preset)) {
      const id = rowId(leaf);
      const value = String(leaf.value);
      if (!byId.has(id)) {
        const densityMatch = value.match(DENSITY_VAR_RE);
        byId.set(id, {
          id,
          target: {
            component: leaf.component,
            slot: leaf.slot,
            props: printMatcher(leaf.matcher),
            nested: leaf.nested,
            kind: leafKind(leaf),
            prop: leaf.prop,
          },
          isDensity: Boolean(densityMatch),
          densityKey: densityMatch ? densityMatch[1] : null,
          label: synthLabel(leaf),
          values: {} as Record<PresetName, string>,
        });
      }
      byId.get(id)!.values[preset] = value;
    }
  }
  // Deterministic order: component, slot, then insertion (matcher/prop) order.
  return [...byId.values()].sort((a, b) => {
    const ck = a.target.component.localeCompare(b.target.component);
    if (ck !== 0) {
      return ck;
    }
    return a.target.slot.localeCompare(b.target.slot);
  });
}

function renderRow(r: Row): string {
  const t = r.target;
  const targetLines = [
    `component: ${JSON.stringify(t.component)}`,
    `slot: ${JSON.stringify(t.slot)}`,
    `props: ${t.props}`,
    `nested: ${JSON.stringify(t.nested)}`,
    `${t.kind}: ${JSON.stringify(t.prop)}`,
  ];
  return `  {
    id: ${JSON.stringify(r.id)},
    label: ${JSON.stringify(r.label)},
    isDensity: ${r.isDensity},
    densityKey: ${JSON.stringify(r.densityKey)},
    target: { ${targetLines.join(', ')} },
    values: { compact: ${JSON.stringify(r.values.compact)}, normal: ${JSON.stringify(
      r.values.normal,
    )}, comfort: ${JSON.stringify(r.values.comfort)} },
  },`;
}

function render(rows: Row[]): string {
  return `/* eslint-disable */
// AUTO-GENERATED by \`pnpm density:codegen\` — do not edit by hand.
// Source of truth: packages/mui-material/src/styles/enhance{Compact,Normal,Comfort}Density.ts
// Regenerate after any preset change; CI diffs this file.

export interface DensityEmitTarget {
  component: string;
  slot: string;
  /** variant matcher; null = base (un-varianted) layer. Functions printed verbatim. */
  props: Record<string, unknown> | ((arg: { ownerState: any }) => boolean) | null;
  /** nested selector chain relative to the slot; '' = none. */
  nested: string;
  /** emitted CSS property (mutually exclusive with privateVar/defaultProp). */
  cssProp?: string;
  /** emitted private var e.g. '--_height'. */
  privateVar?: string;
  /** theme defaultProps prop name — JS-gated seams (e.g. DataGrid rowHeight); applies via defaultProps, not styleOverrides. */
  defaultProp?: string;
}

export interface DensityEmitRow {
  id: string;
  label: string;
  /** value is a var(--mui-density-*) ref → reflows off the scale. */
  isDensity: boolean;
  /** density step key when isDensity (e.g. 'xs'), else null. */
  densityKey: string | null;
  target: DensityEmitTarget;
  /** per-preset value; a preset is absent (undefined) when the row doesn't emit there (e.g. compact-only type). */
  values: { compact?: string; normal?: string; comfort?: string };
}

export const densityEmitTable: DensityEmitRow[] = [
${rows.map(renderRow).join('\n')}
];
`;
}

// --- knobs file: keys managed by codegen, values hand-edited (merge-preserve) ---

type KnobMeta = { label: string; hidden?: true; hiddenIn?: string[]; note?: string };
type KnobValue = string | KnobMeta;

// Read the existing knob map, tolerant of prettier's quote style / trailing commas
// (it's our own trusted generated file). Missing file → {}.
function readExistingKnobs(): Record<string, KnobValue> {
  try {
    const text = fs.readFileSync(OUT_KNOBS, 'utf8');
    // First `{` after the const — the DensityKnobMeta interface above has its own braces.
    const start = text.indexOf('{', text.indexOf('export const densityKnobs'));
    const body = text.slice(start, text.lastIndexOf('}') + 1);
    return new Function(`return ${body}`)() as Record<string, KnobValue>;
  } catch {
    return {};
  }
}

function renderKnobs(rows: Row[], existing: Record<string, KnobValue>): string {
  const entries = rows.map(
    (r) => `  ${JSON.stringify(r.id)}: ${JSON.stringify(existing[r.id] ?? r.label)},`,
  );
  return `// Keys are managed by \`pnpm density:codegen\` — one per emitTable row, in table order.
// EDIT THE VALUES ONLY. A value is the knob label (string), or a meta object:
//   hidden:   the row never applies independently — dropped from densityGroups before
//             the collect path (the old hiddenFieldIds). NOT for virtual-knob members /
//             linked-write targets — those hide at render level in the playground.
//   hiddenIn: hidden only in the listed canvas families (the old hiddenFieldIdsByFamily).
//   note:     why it's hidden / anything the label can't say. Survives regen + remap.
// Regen preserves values, syncs keys to the presets, and auto-remaps an entry whose row
// id changed unambiguously (matcher/selector edits); ambiguous renames fail the codegen.
// CI diffs this file.

export interface DensityKnobMeta {
  label: string;
  /** never applies independently — dropped from densityGroups before collectDensityEdits. */
  hidden?: true;
  /** hidden only in these canvas families. */
  hiddenIn?: string[];
  /** why hidden (kept across regens and id remaps). */
  note?: string;
}

export const densityKnobs: Record<string, string | DensityKnobMeta> = {
${entries.join('\n')}
};
`;
}

// Rename identity: everything in the id except the matcher segment — exactly what
// changes when a variant matcher is edited (fn hash / object form / prop tweaks).
const idTuple = (id: string): string => {
  const parts = id.split('|');
  return [parts[0], parts[1], parts.slice(3, -1).join('|'), parts[parts.length - 1]].join('|');
};
const rowTuple = (r: Row): string =>
  [r.target.component, r.target.slot, r.target.nested, r.target.prop].join('|');

function writeFormatted(file: string, contents: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
  try {
    // `pnpm exec prettier` runs the binary directly — NOT the repo's `prettier`
    // script (pretty-quick --branch master), which would reformat the whole diff.
    execSync(`pnpm exec prettier --write ${file}`, { stdio: 'ignore' });
  } catch {
    console.warn(`prettier failed; wrote unformatted ${path.basename(file)}`);
  }
}

function main(): void {
  const rows = buildRows();
  const existing = readExistingKnobs();
  const ids = new Set(rows.map((r) => r.id));

  // Rename-aware merge: a dropped key matching exactly one ADDED key on
  // component|slot|nested|prop is a rename → carry the whole entry (label + meta).
  // Ambiguous (several candidates, or a candidate claimed twice) fails the run so a
  // hidden row can't silently resurface; zero candidates = real removal → drop.
  const addedByTuple = new Map<string, Row[]>();
  for (const r of rows.filter((row) => !(row.id in existing))) {
    const t = rowTuple(r);
    addedByTuple.set(t, [...(addedByTuple.get(t) ?? []), r]);
  }
  const remapped: string[] = [];
  const dropped: string[] = [];
  const ambiguous: string[] = [];
  const claimed = new Set<string>();
  for (const oldId of Object.keys(existing).filter((id) => !ids.has(id))) {
    const candidates = addedByTuple.get(idTuple(oldId)) ?? [];
    if (candidates.length === 1 && !claimed.has(candidates[0].id)) {
      claimed.add(candidates[0].id);
      existing[candidates[0].id] = existing[oldId];
      remapped.push(`${oldId} → ${candidates[0].id}`);
    } else if (candidates.length === 0) {
      const meta = typeof existing[oldId] === 'object' ? ' [HAD hidden/note meta]' : '';
      dropped.push(`${oldId}${meta}`);
    } else {
      ambiguous.push(`${oldId} → ${candidates.map((c) => c.id).join('  |  ')}`);
    }
  }
  if (ambiguous.length) {
    console.error('density:codegen FAILED — ambiguous knob remap(s).');
    console.error('Migrate these densityKnobs entries to the right new id by hand, rerun:');
    ambiguous.forEach((line) => console.error(`  ${line}`));
    process.exit(1);
  }

  writeFormatted(OUT, render(rows));
  writeFormatted(OUT_KNOBS, renderKnobs(rows, existing));

  console.log(`density:codegen → ${path.relative(process.cwd(), OUT)} (${rows.length} rows)`);
  console.log(`               → ${path.relative(process.cwd(), OUT_KNOBS)} (${rows.length} knobs)`);
  remapped.forEach((line) => console.log(`  remapped: ${line}`));
  dropped.forEach((line) => console.log(`  dropped stale knob: ${line}`));
}

main();
