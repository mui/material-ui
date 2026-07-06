import { expect } from 'chai';
import {
  createTheme,
  enhanceCompactDensity,
  enhanceNormalDensity,
  enhanceComfortDensity,
} from '@mui/material/styles';
import { densityEmitTable, type DensityEmitRow } from './emitTable.generated';
import { densityGroups, densityRow, registeredFieldIds } from './densityFields';
import { densityLabels } from './densityLabels';
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
  it('every registered field id exists in the generated table (drift guard)', () => {
    const ids = new Set(densityEmitTable.map((r) => r.id));
    const missing = registeredFieldIds.filter((id) => !ids.has(id));
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

  it('densityLabels keys exactly match the emit table ids (codegen-managed)', () => {
    const tableIds = densityEmitTable.map((r) => r.id).sort();
    const labelIds = Object.keys(densityLabels).sort();
    expect(labelIds, 'run pnpm density:codegen to sync label keys').to.deep.equal(tableIds);
  });

  it('every registered field has a non-empty label', () => {
    for (const id of registeredFieldIds) {
      expect(densityLabels[id], `no label for ${id}`).to.be.a('string').and.not.equal('');
    }
  });

  describe.each(LEVELS)('preset %s', (level) => {
    const preset = presetComponents(level);

    it('structural parity — builder places each default at its descriptor target', () => {
      for (const id of registeredFieldIds) {
        const row = densityRow(id)!;
        const value = row.values[level];
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
        const merged = mergeOntoPreset(preset, buildOverrides([{ row, value }]));
        const { component, slot, nested } = row.target;
        const applied = readLeaf(merged, component, slot, sample, nested, prop(row));
        const presetVal = readLeaf(preset, component, slot, sample, nested, prop(row));
        expect(applied, `${id} applied`).to.equal(value);
        expect(presetVal, `${id} preset emits same`).to.equal(value);
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
        const value = row.values[level];
        const merged = mergeOntoPreset(preset, buildOverrides([{ row, value }]));
        const applied = readLeaf(
          merged,
          row.target.component,
          row.target.slot,
          c.sample,
          row.target.nested,
          prop(row),
        );
        expect(applied, `${c.id} @ ${level}`).to.equal(value);
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
});
