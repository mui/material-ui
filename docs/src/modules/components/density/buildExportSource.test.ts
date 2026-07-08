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
  densityKey: { 'MuiButton|root|size=small||padding': 'xs' },
  rawPx: { 'MuiButton|root|size=medium||padding': '30px' },
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
    // self-contained: only stable public API imported — never the unreleased enhance* fns
    // (line-anchored: real import statements only, not prose in header comments)
    expect(/^import[^;]*enhance/m.test(src)).to.equal(false);
    expect(src).to.contain("import { createTheme } from '@mui/material/styles'");
    // baseline present (full preset overrides, no user layer needed)
    expect(src).to.contain('MuiButton');
    expect(transpile(src).diagnostics).to.deep.equal([]);
  });

  it('emits the :root scale block per preset', () => {
    const src = buildExportSource(buildExportInput(workspaces()));
    expect(src).to.contain("'--mui-density-xxs': '2px'"); // compact
    expect(src).to.contain("'--mui-density-xxs': '4px'"); // normal
    expect(src).to.contain("'--mui-density-xxs': '6px'"); // comfort
  });

  it('density-key edit keeps the var ref; raw px passes through', () => {
    const src = buildExportSource(
      buildExportInput(workspaces({ ...EDITS.densityKey, ...EDITS.rawPx })),
    );
    expect(src).to.contain("'var(--mui-density-xs)'");
    expect(src).to.contain("'30px'");
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

  it('scale-step edits replace the step in the :root block, per preset, tagged', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.scaleStep)));
    // compact md replaced in place + annotated; other steps keep the baseline
    expect(src).to.contain("'--mui-density-md': '10px', // playground edit");
    expect(src).to.contain("'--mui-density-xxs': '2px'");
    // exactly one preset carries the edit (compact's workspace only)
    expect(src.match(/'10px', \/\/ playground edit/g)).to.have.length(1);
    // step alias resolves to its var ref
    const alias = buildExportSource(buildExportInput(workspaces({ 'density.md': 'xs' })));
    expect(alias).to.contain("'--mui-density-md': 'var(--mui-density-xs)', // playground edit");
    // invalid inputs are inert: multi-token and self-referencing steps keep baseline
    const invalid = buildExportSource(
      buildExportInput(workspaces({ 'density.md': 'xs md', 'density.lg': 'lg' })),
    );
    expect(invalid).not.to.contain(', // playground edit');
    // runtime: the edited scale flows into the vars-theme stylesheet channel
    const { enhanceCompactDensity, enhanceNormalDensity } = evaluate(src);
    const compactTheme = enhanceCompactDensity(createTheme({ cssVariables: true }));
    const compactSheet = compactTheme
      .generateStyleSheets()
      .find((sheet: any) => sheet[':root']?.['--mui-density-md']);
    expect(compactSheet[':root']['--mui-density-md']).to.equal('10px');
    const normalTheme = enhanceNormalDensity(createTheme({ cssVariables: true }));
    const normalSheet = normalTheme
      .generateStyleSheets()
      .find((sheet: any) => sheet[':root']?.['--mui-density-md']);
    expect(normalSheet[':root']['--mui-density-md']).not.to.equal('10px');
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
    // static theme: scale falls back to MuiCssBaseline :root (needs <CssBaseline/>)
    const root = enhanced.components.MuiCssBaseline.styleOverrides[':root'];
    expect(root['--mui-density-xxs']).to.equal('2px');
    // CSS-vars theme: scale rides the theme's own stylesheet channel instead
    const varsTheme = enhanceCompactDensity(createTheme({ cssVariables: true }));
    expect(varsTheme.components.MuiCssBaseline).to.equal(undefined);
    expect(varsTheme.vars.density.xxs).to.equal('var(--mui-density-xxs)');
    expect(varsTheme.generateThemeVars().density.xxs).to.equal('var(--mui-density-xxs)');
    const sheets = varsTheme.generateStyleSheets();
    const densitySheet = sheets.find((sheet: any) => sheet[':root']?.['--mui-density-xxs']);
    expect(densitySheet[':root']['--mui-density-xxs']).to.equal('2px');
    // component overrides present, flat array slots (no nested arrays)
    const buttonRoot = enhanced.components.MuiButton.styleOverrides.root;
    expect(Array.isArray(buttonRoot)).to.equal(true);
    buttonRoot.forEach((layer: unknown) => expect(Array.isArray(layer)).to.equal(false));
    // user themeTokens applied
    expect(enhanced.typography.h1.fontSize).to.equal('5rem');
    expect(enhanced.shape.borderRadius).to.equal(2);
    // compact typography reflow baked per preset
    expect(enhanceCompactDensity(createTheme({})).typography.body2.fontSize).to.equal('0.8125rem');
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

  it('snapshot of a small representative export', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.densityKey)));
    vitestExpect(src).toMatchSnapshot();
  });
});
