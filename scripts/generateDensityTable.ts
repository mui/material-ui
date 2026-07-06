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
const OUT_LABELS = path.resolve(__dirname, '../docs/src/modules/components/density/densityLabels.ts');

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
    // Skip the :root scale definitions (MuiCssBaseline) — export emits those as a
    // standalone --mui-density-* block, not as component overrides.
    if (k.startsWith('--mui-density-')) {
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
    kind: 'cssProp' | 'privateVar';
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
            kind: leaf.prop.startsWith('--') ? 'privateVar' : 'cssProp',
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
  /** emitted CSS property (mutually exclusive with privateVar). */
  cssProp?: string;
  /** emitted private var e.g. '--_height'. */
  privateVar?: string;
}

export interface DensityEmitRow {
  id: string;
  label: string;
  /** value is a var(--mui-density-*) ref → reflows off the scale. */
  isDensity: boolean;
  /** density step key when isDensity (e.g. 'xs'), else null. */
  densityKey: string | null;
  target: DensityEmitTarget;
  values: { compact: string; normal: string; comfort: string };
}

export const densityEmitTable: DensityEmitRow[] = [
${rows.map(renderRow).join('\n')}
];
`;
}

// --- labels file: keys managed by codegen, values hand-edited (merge-preserve) ---

// Read the existing label map, tolerant of prettier's quote style / trailing commas
// (it's our own trusted generated file). Missing file → {}.
function readExistingLabels(): Record<string, string> {
  try {
    const text = fs.readFileSync(OUT_LABELS, 'utf8');
    const body = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    return new Function(`return ${body}`)() as Record<string, string>;
  } catch {
    return {};
  }
}

function renderLabels(rows: Row[], existing: Record<string, string>): string {
  const entries = rows.map(
    (r) => `  ${JSON.stringify(r.id)}: ${JSON.stringify(existing[r.id] ?? r.label)},`,
  );
  return `/* eslint-disable */
// Keys are managed by \`pnpm density:codegen\` — one per emitTable row, in table order.
// EDIT THE VALUES ONLY. Regen preserves your labels and syncs the keys to the presets;
// a new leaf appears with a guessed label, a removed leaf drops out. CI diffs this file.

export const densityLabels: Record<string, string> = {
${entries.join('\n')}
};
`;
}

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
  writeFormatted(OUT, render(rows));

  const existing = readExistingLabels();
  const ids = new Set(rows.map((r) => r.id));
  const dropped = Object.keys(existing).filter((id) => !ids.has(id));
  writeFormatted(OUT_LABELS, renderLabels(rows, existing));

  console.log(`density:codegen → ${path.relative(process.cwd(), OUT)} (${rows.length} rows)`);
  console.log(
    `               → ${path.relative(process.cwd(), OUT_LABELS)} (${rows.length} labels)`,
  );
  if (dropped.length) {
    console.log(`  dropped ${dropped.length} stale label(s): ${dropped.join(', ')}`);
  }
}

main();
