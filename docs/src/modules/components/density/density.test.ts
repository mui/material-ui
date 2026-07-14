import { expect } from 'chai';
import {
  createTheme,
  enhanceCompactDensity,
  enhanceNormalDensity,
  enhanceComfortDensity,
} from '@mui/material/styles';
import { densityEmitTable, type DensityEmitRow } from './emitTable.generated';
import {
  componentFamily,
  densityGroups,
  densityRow,
  fieldLabel,
  hiddenFieldIds,
  registeredFieldIds,
} from './densityFields';
import { densityKnobs } from './densityKnobs';
import { densityVirtualKnobs, densityLinkedWrites, densityExtraRows } from './densityExtraFields';
import { buildOverrides, mergeOntoPreset } from './buildDensityOverrides';

const PRESETS = {
  compact: enhanceCompactDensity,
  normal: enhanceNormalDensity,
  comfort: enhanceComfortDensity,
} as const;
type PresetLevel = keyof typeof PRESETS;
const LEVELS = Object.keys(PRESETS) as PresetLevel[];

const presetComponents = (level: PresetLevel) =>
  (PRESETS[level](createTheme({ cssVariables: true })) as any).components as Record<string, any>;

// Same variant-resolution walk MUI applies: base layer + every matching variant, last write wins.
function flatten(n: any): any[] {
  if (Array.isArray(n)) {
    return n.flatMap(flatten);
  }
  return n && typeof n === 'object' ? [n] : [];
}
function matches(m: any, s: any): boolean {
  if (typeof m === 'function') {
    return Boolean(m({ ownerState: s }));
  }
  if (m && typeof m === 'object') {
    return Object.entries(m).every(([k, v]) => s[k] === v);
  }
  return false;
}

function readLeaf(
  components: Record<string, any>,
  comp: string,
  slot: string,
  sample: any,
  nested: string,
  prop: string,
): unknown {
  let found;
  for (const layer of flatten(components[comp]?.styleOverrides?.[slot])) {
    const sources = [
      layer,
      ...(layer.variants ?? [])
        .filter((v: any) => matches(v.props, sample))
        .map((v: any) => v.style),
    ];
    for (const src of sources) {
      const target = nested ? src?.[nested] : src;
      if (target && typeof target === 'object' && prop in target) {
        found = target[prop];
      }
    }
  }
  return found;
}

const prop = (row: DensityEmitRow) => row.target.cssProp ?? row.target.privateVar!;
// A sample ownerState that satisfies an object/null matcher; null → cannot derive (function).
function deriveSample(m: any): Record<string, unknown> | null {
  if (m === null) {
    return {};
  }
  return typeof m === 'object' ? { ...m } : null;
}

describe('density playground — emit table & override builder', () => {
  it('every registered field id resolves to a row (drift guard)', () => {
    // Generated rows + override-only extra rows both resolve via densityRow.
    const missing = registeredFieldIds.filter((id) => !densityRow(id));
    expect(
      missing,
      `stale field ids — rerun pnpm density:codegen or fix densityFields`,
    ).to.have.length(0);
  });

  it('each group key resolves and each field has a table row', () => {
    for (const group of densityGroups) {
      for (const id of group.fields) {
        expect(densityRow(id), `no row for ${id}`).to.not.equal(undefined);
      }
    }
  });

  it('every emit-table component maps to a canvas family (no silent drop)', () => {
    const unmapped = [...new Set(densityEmitTable.map((r) => r.target.component))].filter(
      (c) => !componentFamily[c],
    );
    expect(unmapped, `add these to componentFamily: ${unmapped}`).to.have.length(0);
  });

  it('densityKnobs keys exactly match the emit table ids (codegen-managed)', () => {
    // Also the stale-guard for hide meta: a knob entry (and its hidden/hiddenIn
    // flags) can only exist under a live row id.
    const tableIds = densityEmitTable.map((r) => r.id).sort();
    const knobIds = Object.keys(densityKnobs).sort();
    expect(knobIds, 'run pnpm density:codegen to sync knob keys').to.deep.equal(tableIds);
  });

  it('every hiddenIn family name exists (typo = silent no-op otherwise)', () => {
    const knownFamilies = new Set(
      Object.values(componentFamily).flatMap((f) => (Array.isArray(f) ? f : [f])),
    );
    const check = (id: string, families: string[] | undefined) => {
      for (const family of families ?? []) {
        expect(
          knownFamilies.has(family),
          `unknown family '${family}' in hiddenIn of ${id}`,
        ).to.equal(true);
      }
    };
    for (const [id, v] of Object.entries(densityKnobs)) {
      if (typeof v === 'object') {
        check(id, v.hiddenIn);
      }
    }
    for (const row of densityExtraRows) {
      check(row.id, row.hiddenIn);
    }
  });

  it('every registered field has a non-empty label', () => {
    for (const id of registeredFieldIds) {
      expect(fieldLabel(id), `no label for ${id}`).to.be.a('string').and.not.equal(id);
    }
  });

  describe.each(LEVELS)('preset %s', (level) => {
    const preset = presetComponents(level);

    it('structural parity — builder places each default at its descriptor target', () => {
      for (const id of registeredFieldIds) {
        const row = densityRow(id)!;
        const value = row.values[level];
        if (value === undefined) {
          continue; // row not emitted at this preset (e.g. compact-only type)
        }
        const { component, slot, props, nested } = row.target;
        const layer = buildOverrides([{ row, value }])[component].styleOverrides[slot];
        const style = props === null ? layer : layer.variants[layer.variants.length - 1].style;
        if (props !== null) {
          expect(layer.variants[0].props, `${id} matcher ref`).to.equal(props);
        }
        const target = nested ? style[nested] : style;
        expect(target[prop(row)], `${id} value`).to.equal(value);
      }
    });

    it('readback parity — appended default resolves to the preset value (object/null matchers)', () => {
      for (const id of registeredFieldIds) {
        const row = densityRow(id)!;
        const sample = deriveSample(row.target.props);
        if (!sample) {
          continue; // function matcher — covered by explicit cases below
        }
        const value = row.values[level];
        if (value === undefined) {
          continue; // row not emitted at this preset (e.g. compact-only type)
        }
        const merged = mergeOntoPreset(preset, buildOverrides([{ row, value }]));
        const { component, slot, nested } = row.target;
        const applied = readLeaf(merged, component, slot, sample, nested, prop(row));
        const presetVal = readLeaf(preset, component, slot, sample, nested, prop(row));
        // table stores values as strings; CSS treats `0` and '0' alike → compare stringified
        expect(String(applied), `${id} applied`).to.equal(value);
        expect(String(presetVal), `${id} preset emits same`).to.equal(value);
      }
    });

    it('readback parity — function-matcher rows (Tab icon+label)', () => {
      const cases: { id: string; sample: any }[] = [
        { id: 'MuiTab|root|fn:1bbekq||minHeight', sample: { icon: true, label: true } },
        {
          id: 'MuiTab|root|fn:8b76di|& > .MuiTab-icon|marginBottom',
          sample: { icon: true, label: true, iconPosition: 'top' },
        },
      ];
      for (const c of cases) {
        const row = densityRow(c.id)!;
        const value = row.values[level]!; // these Tab rows emit at every preset
        const merged = mergeOntoPreset(preset, buildOverrides([{ row, value }]));
        const applied = readLeaf(
          merged,
          row.target.component,
          row.target.slot,
          c.sample,
          row.target.nested,
          prop(row),
        );
        expect(String(applied), `${c.id} @ ${level}`).to.equal(value);
      }
    });

    it('override wins by order and is isolated to its leaf', () => {
      const editId = 'MuiMenuItem|root|dense=false||paddingBlock';
      const siblingId = 'MuiMenuItem|root|dense=true||paddingBlock';
      const editRow = densityRow(editId)!;
      const siblingRow = densityRow(siblingId)!;
      const edited = 'var(--mui-density-xxl)';
      const merged = mergeOntoPreset(preset, buildOverrides([{ row: editRow, value: edited }]));

      expect(
        readLeaf(merged, 'MuiMenuItem', 'root', { dense: false }, '', 'paddingBlock'),
      ).to.equal(edited);
      // sibling (dense=true) untouched → still the preset value
      expect(readLeaf(merged, 'MuiMenuItem', 'root', { dense: true }, '', 'paddingBlock')).to.equal(
        siblingRow.values[level],
      );
    });
  });

  describe('override-only + virtual knobs', () => {
    it('override-only row builds a styleOverride only when filled (per-size)', () => {
      const row = densityRow('MuiButton|root|size=medium||borderRadius')!;
      expect(row, 'Button borderRadius extra row registered').to.not.equal(undefined);
      expect(row.values.compact, 'no preset default').to.equal(undefined);
      const built = buildOverrides([{ row, value: '8px' }]);
      const variant = built.MuiButton.styleOverrides.root.variants[0];
      expect(variant.props).to.deep.equal({ size: 'medium' });
      expect(variant.style.borderRadius).to.equal('8px');
    });

    it('linked writes: key and linked rows all resolve to table rows', () => {
      for (const [keyId, links] of Object.entries(densityLinkedWrites)) {
        expect(Boolean(densityRow(keyId)), `${keyId} resolves`).to.equal(true);
        for (const link of links) {
          expect(Boolean(densityRow(link.id)), `${link.id} resolves`).to.equal(true);
          expect(link.wrap('8px')).to.be.a('string');
          // hiddenFieldIds drops rows from densityGroups -> collect path; linked
          // targets must hide at render level only or their writes never apply.
          expect(hiddenFieldIds.has(link.id), `${link.id} not in hiddenFieldIds`).to.equal(false);
        }
      }
    });

    it('virtual knob writes one value to every member target', () => {
      for (const knob of densityVirtualKnobs) {
        const edits = knob.members.map((id) => ({ row: densityRow(id)!, value: '4px' }));
        expect(
          edits.every((edit) => edit.row),
          `${knob.id} members resolve`,
        ).to.equal(true);
        const built = buildOverrides(edits);
        // every member's emitted prop lands at 4px (base nested or variant)
        for (const id of knob.members) {
          const { component, slot, nested } = densityRow(id)!.target;
          const layer = built[component].styleOverrides[slot];
          const scope = nested
            ? (layer[nested] ?? layer.variants?.map((v: any) => v.style[nested]).find(Boolean))
            : layer;
          expect(JSON.stringify(scope), `${id} @ ${knob.id}`).to.contain('4px');
        }
      }
    });
  });
});

describe('density scale emission — theme vars channel', () => {
  it('CSS-vars theme: scale rides generateThemeVars/generateStyleSheets, no MuiCssBaseline', () => {
    for (const level of LEVELS) {
      const theme = PRESETS[level](createTheme({ cssVariables: true })) as any;
      expect(theme.components.MuiCssBaseline, level).to.equal(undefined);
      // prefix-aware refs off theme.cssVarPrefix
      expect(theme.vars.density.md, level).to.equal('var(--mui-density-md)');
      // CssVarsProvider rebuilds vars from generateThemeVars — density must survive
      expect(theme.generateThemeVars().density.md, level).to.equal('var(--mui-density-md)');
      const sheets = theme.generateStyleSheets();
      const densitySheet = sheets.find((sheet: any) => sheet[':root']?.['--mui-density-md']);
      expect(densitySheet[':root']['--mui-density-md'], level).to.equal(theme.density.md);
    }
  });

  it('custom cssVarPrefix flows into the refs and the emitted sheet', () => {
    const theme = enhanceCompactDensity(
      createTheme({ cssVariables: { cssVarPrefix: 'acme' } }),
    ) as any;
    expect(theme.vars.density.md).to.equal('var(--acme-density-md)');
    const sheets = theme.generateStyleSheets();
    const densitySheet = sheets.find((sheet: any) => sheet[':root']?.['--acme-density-md']);
    expect(densitySheet[':root']['--acme-density-md']).to.equal(theme.density.md);
  });

  it('static theme: raw px on theme.density only — no vars, no stylesheet wrapping', () => {
    const theme = enhanceCompactDensity(createTheme()) as any;
    expect(theme.vars).to.equal(undefined);
    expect(theme.generateStyleSheets).to.equal(undefined);
    expect(theme.components.MuiCssBaseline).to.equal(undefined);
    expect(theme.density.md).to.match(/px$/);
  });
});
