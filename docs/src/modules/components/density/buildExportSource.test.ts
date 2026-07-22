import { expect } from 'chai';
import { describe, it, expect as vitestExpect } from 'vitest';
import * as ts from 'typescript';
import * as muiStyles from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { buildExportSource } from './buildExportSource';
import { buildExportInput, type MappingByPreset } from './exportPayload';

// One override workspace per preset — edits placed under `compact` must NOT leak
// into the normal/comfort enhancers.
const workspaces = (compact: Record<string, string> = {}): MappingByPreset => ({
  compact,
  normal: {},
  comfort: {},
});

const EDITS = {
  densityKey: { 'MuiButton|root|size=small||paddingBlock': 'xs' },
  rawPx: { 'MuiButton|root|size=medium||paddingBlock': '30px' },
  virtualMembers: {
    // virtual:MuiTab:iconGapBlock — both members get one value (fn-matcher rows)
    'MuiTab|root|fn:8b76di|& > .MuiTab-icon|marginBottom': 'sm',
    'MuiTab|root|fn:ekzzmq|& > .MuiTab-icon|marginTop': 'sm',
  },
  themeTokens: { 'typography.h1.fontSize': '5rem', 'shape.borderRadius': '2' },
  scaleStep: { 'density.md': '10px' },
};

function transpile(source: string) {
  return ts.transpileModule(source, {
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
}

// Evaluate the generated module with the real @mui/material/styles — the closest
// scriptable stand-in for "paste into a fresh app".
function evaluate(source: string): Record<string, (theme: unknown) => any> {
  const out = transpile(source);
  expect(out.diagnostics ?? []).to.deep.equal([]);
  const mod = { exports: {} as Record<string, any> };
  const req = (id: string) => {
    if (id === '@mui/material/styles') {
      return muiStyles;
    }
    throw new Error(`unexpected import in generated file: ${id}`);
  };
  // eslint-disable-next-line no-new-func
  new Function('require', 'module', 'exports', out.outputText)(req, mod, mod.exports);
  return mod.exports;
}

describe('buildExportSource', () => {
  it('empty edits → baseline-only self-contained file', () => {
    const src = buildExportSource(buildExportInput(workspaces()));
    // RFC contract naming: the file DECLARES the enhance* functions itself
    expect(src).to.contain('export function enhanceCompactDensity');
    expect(src).to.contain('export function enhanceNormalDensity');
    expect(src).to.contain('export function enhanceComfortDensity');
    // self-contained: only a type imported — never the unreleased enhance* fns
    // (line-anchored: real import statements only, not prose in header comments)
    expect(/^import[^;]*enhance/m.test(src)).to.equal(false);
    expect(src).to.contain("import type { Theme } from '@mui/material/styles'");
    // ports applyDensity in-file — no runtime dependency on the unreleased core
    expect(src).to.contain('function applyDensity');
    // baseline present (full preset overrides, no user layer needed)
    expect(src).to.contain('MuiButton');
    expect(transpile(src).diagnostics).to.deep.equal([]);
  });

  it('emits the scale map per preset (bare step keys) + keeps var refs in overrides', () => {
    const src = buildExportSource(buildExportInput(workspaces()));
    expect(src).to.contain("xxs: '2px'"); // compact
    expect(src).to.contain("xxs: '4px'"); // normal
    expect(src).to.contain("xxs: '6px'"); // comfort
    // overrides keep var(--mui-density-*) refs (applyDensity emits them on the
    // theme's own channel); no MuiCssBaseline :root injection
    expect(src).to.contain('var(--mui-density-');
    expect(src).to.not.contain('MuiCssBaseline');
  });

  it('density-key edit stays a ref in source, resolves to px on a static theme; raw px passes through', () => {
    const src = buildExportSource(
      buildExportInput(workspaces({ ...EDITS.densityKey, ...EDITS.rawPx })),
    );
    expect(src).to.contain('var(--mui-density-xs)'); // density-key edit kept as a ref
    expect(src).to.contain("'30px'"); // raw px passes through verbatim
    // static theme: enhance() resolves the refs to px off the scale
    const { enhanceCompactDensity } = evaluate(src);
    const theme = enhanceCompactDensity(createTheme({}));
    const overrides = JSON.stringify(theme.components.MuiButton.styleOverrides.root);
    expect(overrides).to.not.contain('var('); // resolved
    expect(overrides).to.contain(theme.density.xs); // xs step px inlined
  });

  it('user override layers are wrapped in code comments; markers never leak as data', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.rawPx)));
    expect(src).to.contain('// ─── user overrides (playground edits)');
    expect(src).to.contain('// ─── end user overrides ───');
    // marker keys are print-time only
    expect(src).not.to.contain('__densityUserOverride');
    // baseline-only export carries no user-override comments
    const clean = buildExportSource(buildExportInput(workspaces()));
    expect(clean).not.to.contain('user overrides (playground edits)');
    expect(transpile(src).diagnostics).to.deep.equal([]);
  });

  it('virtual-knob members land as fn-matcher variants with function source', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.virtualMembers)));
    // fn matchers print verbatim — they read ownerState only
    expect(src).to.contain('ownerState');
    expect(src).to.contain('marginBottom');
    expect(src).to.contain('marginTop');
    expect(transpile(src).diagnostics).to.deep.equal([]);
  });

  it('scale-step edits replace the step in the scale map, per preset, tagged', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.scaleStep)));
    // compact md replaced + annotated; other steps keep the baseline
    expect(src).to.contain("md: '10px', // playground edit");
    expect(src).to.contain("xxs: '2px'");
    // exactly one preset carries the edit (compact's workspace only)
    expect(src.match(/'10px', \/\/ playground edit/g)).to.have.length(1);
    // runtime: the edited step lands on theme.density, compact only
    const { enhanceCompactDensity, enhanceNormalDensity } = evaluate(src);
    expect(enhanceCompactDensity(createTheme({})).density.md).to.equal('10px');
    expect(enhanceNormalDensity(createTheme({})).density.md).to.not.equal('10px');
    // a step alias resolves to the referenced step's px — no var refs
    const alias = buildExportSource(buildExportInput(workspaces({ 'density.md': 'xs' })));
    const compactXs = enhanceCompactDensity(createTheme({})).density.xs;
    expect(alias).to.contain(`md: '${compactXs}', // playground edit`);
    expect(alias).to.not.contain("md: 'var(--mui-density-"); // scale step is px, not a ref
    // invalid inputs are inert: multi-token and self-referencing steps keep baseline
    const invalid = buildExportSource(
      buildExportInput(workspaces({ 'density.md': 'xs md', 'density.lg': 'lg' })),
    );
    expect(invalid).not.to.contain(', // playground edit');
  });

  it('typography + shape edits land in their preset payload, tagged as playground edits', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.themeTokens)));
    expect(src).to.contain("fontSize: '5rem', // playground edit");
    expect(src).to.contain('borderRadius: 2, // playground edit');
  });

  it('generated module runs: preserves the app theme, applies overrides + scale', () => {
    const src = buildExportSource(
      buildExportInput(workspaces({ ...EDITS.densityKey, ...EDITS.themeTokens })),
    );
    const { enhanceCompactDensity } = evaluate(src);
    const base = createTheme({ palette: { primary: { main: '#ff5252' } } });
    const enhanced = enhanceCompactDensity(base);
    // app theme survives the round-trip
    expect(enhanced.palette.primary.main).to.equal('#ff5252');
    // scale exposed on theme.density (raw px) — no CssBaseline injected
    expect(enhanced.density.xxs).to.equal('2px');
    expect(enhanced.components.MuiCssBaseline).to.equal(undefined);
    // static theme: component overrides present, flat array slots, refs → px
    const buttonRoot = enhanced.components.MuiButton.styleOverrides.root;
    expect(Array.isArray(buttonRoot)).to.equal(true);
    buttonRoot.forEach((layer: unknown) => expect(Array.isArray(layer)).to.equal(false));
    expect(JSON.stringify(buttonRoot)).to.not.contain('var('); // resolved to px
    // CSS-vars theme: scale on theme.density + vars.density refs; overrides KEEP
    // the refs; applyDensity emits --mui-density-* on the theme's own stylesheet.
    const varsTheme = enhanceCompactDensity(createTheme({ cssVariables: true }));
    expect(varsTheme.density.xxs).to.equal('2px');
    expect(varsTheme.components.MuiCssBaseline).to.equal(undefined);
    expect(varsTheme.vars.density.xxs).to.equal('var(--mui-density-xxs)');
    expect(JSON.stringify(varsTheme.components.MuiButton.styleOverrides.root)).to.contain(
      'var(--mui-density-',
    );
    const sheets = JSON.stringify(varsTheme.generateStyleSheets());
    expect(sheets).to.contain('--mui-density-xxs');
    expect(sheets).to.contain('2px');
    // user themeTokens applied
    expect(enhanced.typography.h1.fontSize).to.equal('5rem');
    expect(enhanced.shape.borderRadius).to.equal(2);
    // compact typography reflow baked per preset
    expect(enhanceCompactDensity(createTheme({})).typography.body2.fontSize).to.equal('0.8125rem');
  });

  it('defaultProps emissions (DataGrid heights): baked per preset, app defaults win, knob edit applies', () => {
    const src = buildExportSource(buildExportInput(workspaces()));
    expect(src).to.contain('defaultProps');
    expect(src).to.contain('rowHeight: 28');
    const { enhanceCompactDensity, enhanceComfortDensity } = evaluate(src);
    const enhanced = enhanceCompactDensity(createTheme({}));
    expect(enhanced.components.MuiDataGrid.defaultProps).to.deep.equal({
      rowHeight: 28,
      columnHeaderHeight: 28,
    });
    expect(
      enhanceComfortDensity(createTheme({})).components.MuiDataGrid.defaultProps.rowHeight,
    ).to.equal(60);
    // the app's own defaultProps win over the baked preset value
    const appTheme = createTheme({}) as any;
    appTheme.components = { MuiDataGrid: { defaultProps: { rowHeight: 33 } } };
    const merged = enhanceCompactDensity(appTheme);
    expect(merged.components.MuiDataGrid.defaultProps.rowHeight).to.equal(33);
    expect(merged.components.MuiDataGrid.defaultProps.columnHeaderHeight).to.equal(28);
    // a playground edit on the defaultProps knob bakes into its preset only
    const edited = evaluate(
      buildExportSource(
        buildExportInput(workspaces({ 'MuiDataGrid|defaultProps|base||rowHeight': '48' })),
      ),
    );
    expect(
      edited.enhanceCompactDensity(createTheme({})).components.MuiDataGrid.defaultProps.rowHeight,
    ).to.equal(48);
    expect(
      edited.enhanceNormalDensity(createTheme({})).components.MuiDataGrid.defaultProps.rowHeight,
    ).to.equal(40);
  });

  it('edits are per-preset: compact edits do NOT leak into enhanceNormalDensity', () => {
    const src = buildExportSource(
      buildExportInput(workspaces({ ...EDITS.rawPx, ...EDITS.themeTokens })),
    );
    const { enhanceNormalDensity } = evaluate(src);
    const normal = enhanceNormalDensity(createTheme({}));
    // normal's workspace was empty → master typography/shape, no 30px override
    expect(normal.typography.h1.fontSize).not.to.equal('5rem');
    expect(normal.shape.borderRadius).to.equal(4);
    expect(JSON.stringify(normal.components.MuiButton.styleOverrides.root)).not.to.contain('30px');
  });

  it('spacing: compact bakes its tuned base (6); normal/comfort keep MUI default; dual-mode runtime', () => {
    const src = buildExportSource(buildExportInput(workspaces()));
    expect(src).to.contain('spacing: 6,'); // compact tightens spacing, baked plain
    const { enhanceCompactDensity, enhanceNormalDensity } = evaluate(src);
    // CSS-vars theme: --mui-spacing rides the theme's own channel
    const varsTheme = enhanceCompactDensity(createTheme({ cssVariables: true }));
    expect(varsTheme.vars.spacing).to.equal('var(--mui-spacing, 6px)');
    expect(JSON.stringify(varsTheme.generateStyleSheets())).to.contain('"--mui-spacing":"6px"');
    // static theme: spacing function scales off the tuned base (6 * 2)
    expect(enhanceCompactDensity(createTheme({})).spacing(2)).to.equal('12px');
    // normal keeps the MUI default (8) — no baked spacing override (8 * 2)
    expect(enhanceNormalDensity(createTheme({})).spacing(2)).to.equal('16px');
  });

  it('spacing edit overrides the preset base and is tagged', () => {
    const src = buildExportSource(buildExportInput(workspaces({ spacing: '10' })));
    expect(src).to.contain('spacing: 10, // playground edit');
    const { enhanceCompactDensity } = evaluate(src);
    expect(enhanceCompactDensity(createTheme({})).spacing(3)).to.equal('30px'); // 10 * 3
    const vars = enhanceCompactDensity(createTheme({ cssVariables: true }));
    expect(vars.vars.spacing).to.equal('var(--mui-spacing, 10px)');
  });

  it('snapshot of a small representative export', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.densityKey)));
    vitestExpect(src).toMatchSnapshot();
  });
});
