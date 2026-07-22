// Pure serializer: per-preset payload (baseline emit ⊕ user edits) → a
// self-contained `density.ts` source string. The generated file imports ONLY a
// type from @mui/material/styles — the unreleased enhance*Density logic is baked
// in as data + a ported `applyDensity` — so it previews density in a production
// sandbox without upgrading @mui/material. Component overrides keep their
// `var(--mui-density-*)` refs; the generated `enhance` mirrors the real preset:
// CSS-vars themes ship the scale on the theme's own vars channel (no
// <CssBaseline/>), static themes resolve the refs to raw px at runtime. The scale
// is a plain `{ 'xx-small', 'x-small', … }` map (a `DensityScale`) exposed on `theme.density`.

export interface ExportPresetPayload {
  name: 'high' | 'medium' | 'low';
  /** the scale map — { 'xx-small': '2px', … } (bare step keys, a DensityScale exposed on theme.density); user-edited steps carry a USER_VALUE_KEY wrapper */
  scale: Record<string, unknown>;
  /** baseline ⊕ THIS preset's edits, flat-array slots; density sizes stay var(--mui-density-*) refs (resolved to px at runtime for static themes) */
  components: Record<string, { styleOverrides: Record<string, unknown> }>;
  /** the preset's own type reflow ⊕ this preset's user typography edits; {} when none */
  typography: Record<string, Record<string, unknown>>;
  /** this preset's user shape edits (borderRadius); {} when none */
  shape: Record<string, unknown>;
  /** theme.spacing base px (preset default ⊕ user edit); undefined = MUI default (8), not baked. An edit carries a USER_VALUE_KEY wrapper */
  spacing?: number | Record<string, number>;
}

export interface ExportInput {
  presets: ExportPresetPayload[];
}

// Serialization markers set by exportPayload so the generated file can annotate
// which parts came from playground edits (vs the preset baseline). Both are
// STRIPPED/UNWRAPPED at print time — they never reach the generated output as data.
/** marks an appended slot LAYER as user edits → wrapped in begin/end comments */
export const USER_LAYER_KEY = '__densityUserOverrideLayer';
/** wraps a user-edited LEAF value → printed with a trailing `// playground edit` */
export const USER_VALUE_KEY = '__densityUserOverrideValue';

const isUserLayer = (v: unknown): v is Record<string, unknown> =>
  Boolean(v) && typeof v === 'object' && (v as Record<string, unknown>)[USER_LAYER_KEY] === true;

const asUserValue = (v: unknown): unknown =>
  v && typeof v === 'object' && USER_VALUE_KEY in (v as Record<string, unknown>)
    ? (v as Record<string, unknown>)[USER_VALUE_KEY]
    : undefined;

const IDENT = /^[A-Za-z_$][\w$]*$/;

const quote = (s: string) =>
  `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;

const printKey = (k: string) => (IDENT.test(k) ? k : quote(k));

function printValue(value: unknown, indent: string): string {
  if (typeof value === 'function') {
    // fn matchers print verbatim — self-contained arrows reading ownerState only
    return value.toString();
  }
  if (typeof value === 'string') {
    return quote(value);
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) {
    // layered slots may carry an undefined preset layer — skip, same semantics
    const items = value.filter((v) => v !== undefined && v !== null);
    if (items.length === 0) {
      return '[]';
    }
    const inner = `${indent}  `;
    const lines = items.map((v) => {
      if (isUserLayer(v)) {
        return (
          `${inner}// ─── user overrides (playground edits) — appended layer, wins by order ───\n` +
          `${inner}${printValue(v, inner)},\n` +
          `${inner}// ─── end user overrides ───`
        );
      }
      return `${inner}${printValue(v, inner)},`;
    });
    return `[\n${lines.join('\n')}\n${indent}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([k, v]) => v !== undefined && k !== USER_LAYER_KEY,
    );
    if (entries.length === 0) {
      return '{}';
    }
    const inner = `${indent}  `;
    const lines = entries.map(([k, v]) => {
      const userValue = asUserValue(v);
      if (userValue !== undefined) {
        return `${inner}${printKey(k)}: ${printValue(userValue, inner)}, // playground edit`;
      }
      return `${inner}${printKey(k)}: ${printValue(v, inner)},`;
    });
    return `{\n${lines.join('\n')}\n${indent}}`;
  }
  return 'undefined';
}

export function buildExportSource(input: ExportInput): string {
  const presetConsts = input.presets
    .map((p) => {
      // spacing: a plain number is the preset default; a USER_VALUE_KEY wrapper is
      // a playground edit (tagged); undefined = MUI default, omit the field.
      const editedSpacing = asUserValue(p.spacing);
      let spacingLine = '';
      if (editedSpacing !== undefined) {
        spacingLine = `  spacing: ${printValue(editedSpacing, '  ')}, // playground edit\n`;
      } else if (p.spacing !== undefined) {
        spacingLine = `  spacing: ${printValue(p.spacing, '  ')},\n`;
      }
      return `const ${p.name} = {
  scale: ${printValue(p.scale, '  ')},
  components: ${printValue(p.components, '  ')},
  typography: ${printValue(p.typography, '  ')},
  shape: ${printValue(p.shape, '  ')},
${spacingLine}};`;
    })
    .join('\n\n');

  return `// density.ts — generated by the density playground.
// Preview MUI density WITHOUT upgrading @mui/material — the unreleased preset
// logic is inlined as data + a ported \`applyDensity\`; only a type is imported.
//
// The generated \`enhance\` mirrors the real enhance*Density presets:
//   • CSS-vars theme (createTheme({ cssVariables: true })) — the scale rides the
//     theme's own vars channel (--mui-density-* on generateStyleSheets, same as
//     the palette vars); ThemeProvider alone applies density, no <CssBaseline/>.
//   • static theme (createTheme()) — the baked var(--mui-density-*) refs resolve
//     to raw px at runtime; ThemeProvider alone, still no <CssBaseline/>.
//
// Usage:
//   const theme = enhanceHighDensity(createTheme({ /* your options */ }));
//   <ThemeProvider theme={theme}>…</ThemeProvider>
import type { Theme } from '@mui/material/styles';

type AnyRecord = Record<string, any>;

// Per-preset payload, baked at export time — each preset carries ITS OWN
// playground edits (the playground keeps one override workspace per preset):
//   scale      → { 'xx-small': '<px>', … } — the DensityScale, exposed on theme.density
//   components → preset baseline emissions ⊕ that preset's edits (flat-array
//                slots); density sizes stay var(--mui-density-*) refs
//   typography → the preset's own type reflow ⊕ that preset's typography edits
//   shape      → that preset's shape edits (borderRadius)
//   spacing    → theme.spacing base px, when the preset tunes it (else omitted)
// Playground edits are marked inline: appended slot layers sit between
// "user overrides" comments; edited token leaves carry a "playground edit" tag.
${presetConsts}

function mergeTypography(base: AnyRecord, patch: AnyRecord): AnyRecord {
  const out: AnyRecord = { ...base };
  for (const [variant, styles] of Object.entries(patch)) {
    out[variant] = { ...(out[variant] as AnyRecord), ...(styles as AnyRecord) };
  }
  return out;
}

// Resolve every baked \`var(--mui-density-<key>)\` ref to the step's raw px off the
// scale — refs may be embedded (e.g. \`calc(-2px - var(--mui-density-xs))\`), hence a
// regex over string leaves. Functions (variant matchers) pass through verbatim.
// Used only for static themes; CSS-vars themes keep the refs (the vars ship on the
// theme's own stylesheet channel).
function resolveDensityRefs(value: unknown, scale: Record<string, string>): unknown {
  if (typeof value === 'string') {
    return value.replace(/var\\(--mui-density-([\\w-]+)\\)/g, (whole, key) => scale[key] ?? whole);
  }
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => resolveDensityRefs(v, scale));
  }
  return Object.fromEntries(
    Object.entries(value as AnyRecord).map(([k, v]) => [k, resolveDensityRefs(v, scale)]),
  );
}

// Ported from the unreleased density core. Exposes the scale on \`theme.density\`;
// for a CSS-vars theme it rides the theme's own vars channel (\`vars.density\` +
// wrapped generateThemeVars/generateStyleSheets) so ThemeProvider materialises the
// --mui-density-* vars itself — same channel as the palette vars, no <CssBaseline/>.
// A static theme keeps raw px on \`theme.density\`; its overrides are resolved to px
// by enhance() below. Refs use the default 'mui' prefix (the playground exports
// from a createTheme({ cssVariables: true }) theme).
function applyDensity(themeInput: AnyRecord, scale: Record<string, string>): AnyRecord {
  const theme: AnyRecord = { ...themeInput };
  theme.density = { ...scale };
  theme.components = { ...themeInput.components };

  if (themeInput.vars) {
    const varName = (key: string) => '--mui-density-' + key;
    const refs: AnyRecord = {};
    const rootVars: AnyRecord = {};
    for (const key of Object.keys(scale)) {
      refs[key] = 'var(' + varName(key) + ')';
      rootVars[varName(key)] = scale[key];
    }
    theme.vars = { ...theme.vars, density: refs };
    // CssVarsProvider rebuilds vars from generateThemeVars() — wrap it or the
    // provider-composed theme silently drops vars.density.
    const prevThemeVars = theme.generateThemeVars;
    theme.generateThemeVars = () => ({
      ...(prevThemeVars ? prevThemeVars() : theme.vars),
      density: refs,
    });
    const prevStyleSheets = theme.generateStyleSheets;
    theme.generateStyleSheets = () => [
      ...(prevStyleSheets ? prevStyleSheets() : []),
      { [theme.rootSelector || ':root']: rootVars },
    ];
  }

  return theme;
}

// theme.spacing base — var-backed like the density scale (high tightens it to
// 6). CSS-vars themes emit --mui-spacing on the channel (components read
// calc(n * var(--mui-spacing))); static themes get a spacing function.
function applySpacing(theme: AnyRecord, base: number): AnyRecord {
  const px = base + 'px';
  if (theme.vars) {
    theme.vars = { ...theme.vars, spacing: 'var(--mui-spacing, ' + px + ')' };
    const prev = theme.generateStyleSheets;
    theme.generateStyleSheets = () => [
      ...(prev ? prev() : []),
      { [theme.rootSelector || ':root']: { '--mui-spacing': px } },
    ];
  } else {
    theme.spacing = (...args: any[]) =>
      (args.length ? args : [1]).map((a) => (typeof a === 'number' ? a * base + 'px' : a)).join(' ');
  }
  return theme;
}

function enhance(
  theme: Theme,
  p: {
    scale: Record<string, string>;
    components: AnyRecord;
    typography: AnyRecord;
    shape: AnyRecord;
    spacing?: number;
  },
): Theme {
  const enhanced: AnyRecord = applyDensity(theme as AnyRecord, p.scale);

  // Component overrides — flat array-form slot merge (density wins by order, the
  // app's own styleOverrides/variants are kept as the leading layer). NEVER
  // deepmerge here: it would replace the preset's variants arrays.
  for (const [name, def] of Object.entries(p.components)) {
    const prev: AnyRecord = enhanced.components[name] ?? {};
    const slots: AnyRecord = { ...prev.styleOverrides };
    for (const [slot, layer] of Object.entries((def as AnyRecord).styleOverrides)) {
      const layers = Array.isArray(layer) ? layer : [layer];
      slots[slot] = [prev.styleOverrides?.[slot], ...layers].filter(Boolean);
    }
    const next: AnyRecord = { ...prev, styleOverrides: slots };
    // JS-gated prop seams (e.g. DataGrid heights) — the app's own defaultProps win.
    const defProps = (def as AnyRecord).defaultProps;
    if (defProps) {
      next.defaultProps = { ...defProps, ...prev.defaultProps };
    }
    enhanced.components[name] = next;
  }

  // Static theme: no vars channel ships, so resolve the baked var(--mui-density-*)
  // refs to their scale px in place. CSS-vars themes keep the refs — applyDensity
  // emits the vars on the theme's own stylesheet. Mirrors the preset's dual-mode
  // \`(vars || theme).density\`.
  if (!enhanced.vars) {
    enhanced.components = resolveDensityRefs(enhanced.components, enhanced.density);
  }

  // Typography reflow (⊕ user edits) and shape edits — mutated in place like the
  // preset (variants resolve off theme.typography; no createTheme re-run needed).
  enhanced.typography = mergeTypography(enhanced.typography, p.typography);
  enhanced.shape = { ...enhanced.shape, ...p.shape };
  if (p.spacing != null) {
    applySpacing(enhanced, p.spacing);
  }

  return enhanced as Theme;
}

export function enhanceHighDensity(theme: Theme): Theme {
  return enhance(theme, high);
}
export function enhanceMediumDensity(theme: Theme): Theme {
  return enhance(theme, medium);
}
export function enhanceLowDensity(theme: Theme): Theme {
  return enhance(theme, low);
}
`;
}
