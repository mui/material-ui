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
    expect(src).to.contain('export const compactDensity');
    expect(src).to.contain('export const normalDensity');
    expect(src).to.contain('export const comfortDensity');
    // self-contained: only stable public API imported
    expect(src).not.to.contain('enhanceCompactDensity');
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

  it('virtual-knob members land as fn-matcher variants with function source', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.virtualMembers)));
    // fn matchers print verbatim — they read ownerState only
    expect(src).to.contain('ownerState');
    expect(src).to.contain('marginBottom');
    expect(src).to.contain('marginTop');
    expect(transpile(src).diagnostics).to.deep.equal([]);
  });

  it('typography + shape edits land in their preset payload', () => {
    const src = buildExportSource(buildExportInput(workspaces(EDITS.themeTokens)));
    expect(src).to.contain("'5rem'");
    expect(src).to.contain('borderRadius: 2');
  });

  it('generated module runs: preserves the app theme, applies overrides + scale', () => {
    const src = buildExportSource(
      buildExportInput(workspaces({ ...EDITS.densityKey, ...EDITS.themeTokens })),
    );
    const { compactDensity } = evaluate(src);
    const base = createTheme({ palette: { primary: { main: '#ff5252' } } });
    const enhanced = compactDensity(base);
    // app theme survives the round-trip
    expect(enhanced.palette.primary.main).to.equal('#ff5252');
    // scale materialised via MuiCssBaseline :root
    const root = enhanced.components.MuiCssBaseline.styleOverrides[':root'];
    expect(root['--mui-density-xxs']).to.equal('2px');
    // component overrides present, flat array slots (no nested arrays)
    const buttonRoot = enhanced.components.MuiButton.styleOverrides.root;
    expect(Array.isArray(buttonRoot)).to.equal(true);
    buttonRoot.forEach((layer: unknown) => expect(Array.isArray(layer)).to.equal(false));
    // user themeTokens applied
    expect(enhanced.typography.h1.fontSize).to.equal('5rem');
    expect(enhanced.shape.borderRadius).to.equal(2);
    // compact typography reflow baked per preset
    expect(compactDensity(createTheme({})).typography.body2.fontSize).to.equal('0.8125rem');
  });

  it('edits are per-preset: compact edits do NOT leak into normalDensity', () => {
    const src = buildExportSource(
      buildExportInput(workspaces({ ...EDITS.rawPx, ...EDITS.themeTokens })),
    );
    const { normalDensity } = evaluate(src);
    const normal = normalDensity(createTheme({}));
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
