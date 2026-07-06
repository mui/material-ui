import { densityEmitTable, type DensityEmitRow } from './emitTable.generated';
import { densityLabels } from './densityLabels';

/**
 * Curation of the generated table: which emitted leaves are tunable in the
 * playground, and their grouping. Field entries are just row `id`s — the display
 * label comes from `densityLabels` (codegen-managed keys, hand-edited values).
 * The freshness test asserts every id here still exists in the table, so a preset
 * change that drops/renames a leaf fails loud. Extend group-by-group.
 */
export interface DensityGroup {
  /** matches a COMPONENT_DEFS key in the playground (canvas matrix + label) */
  key: string;
  /** generated-table row ids, in display order */
  fields: string[];
}

export const densityGroups: DensityGroup[] = [
  {
    key: 'Menu',
    fields: [
      'MuiList|root|disablePadding=false||paddingBlock',
      'MuiMenuItem|root|dense=false||paddingBlock',
      'MuiMenuItem|root|dense=false,disableGutters=false||paddingInline',
      'MuiMenuItem|root|dense=false||minHeight',
      'MuiMenuItem|root|dense=true||paddingBlock',
      'MuiMenuItem|root|dense=true,disableGutters=false||paddingInline',
      'MuiMenuItem|root|dense=true||minHeight',
    ],
  },
  {
    key: 'Tabs',
    fields: [
      'MuiTab|root|base||minHeight',
      'MuiTabs|root|base||minHeight',
      'MuiTab|root|fn:1bbekq||minHeight',
      'MuiTab|root|base||paddingBlock',
      'MuiTab|root|fn:1bbekq||paddingBlock',
      'MuiTab|root|base||paddingInline',
      'MuiTab|root|fn:8b76di|& > .MuiTab-icon|marginBottom',
      'MuiTab|root|fn:ekzzmq|& > .MuiTab-icon|marginTop',
      'MuiTab|root|fn:s0l8zx|& > .MuiTab-icon|marginRight',
      'MuiTab|root|fn:8au602|& > .MuiTab-icon|marginLeft',
    ],
  },
  {
    key: 'Autocomplete',
    fields: [
      'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|minHeight',
      'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|paddingBlock',
      'MuiAutocomplete|listbox|base|& .MuiAutocomplete-option|paddingInline',
    ],
  },
];

const rowById = new Map<string, DensityEmitRow>(densityEmitTable.map((r) => [r.id, r]));

export const densityRow = (id: string): DensityEmitRow | undefined => rowById.get(id);

/** Display label for a field id (codegen-managed keys, hand-edited values). */
export const fieldLabel = (id: string): string => densityLabels[id] ?? id;

/** Every id the registry references, for the freshness/existence test. */
export const registeredFieldIds = densityGroups.flatMap((g) => g.fields);
