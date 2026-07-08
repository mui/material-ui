import { densityGroups, densityRow } from './densityFields';
import { themeTokenGroups, coerceToken } from './themeTokens';
import { SCALE_KEYS, parseMapping, resolveValue, tokenize } from './mappingValue';
import type { DensityEdit } from './buildDensityOverrides';

// Mapping → the edit lists the canvas applies. Shared by `canvasTheme` and the
// export builder so the exported file encodes exactly what the canvas shows
// (drift guard: one collection path, two consumers).

export function collectDensityEdits(mapping: Record<string, string>): DensityEdit[] {
  const edits: DensityEdit[] = [];
  const seen = new Set<string>(); // a shared field (e.g. FormControlLabel) sits in two families
  for (const group of densityGroups) {
    for (const id of group.fields) {
      if (seen.has(id)) {
        continue;
      }
      seen.add(id);
      const raw = mapping[id] ?? '';
      if (parseMapping(raw).state !== 'ok') {
        continue;
      }
      const row = densityRow(id);
      if (row) {
        edits.push({ row, value: resolveValue(raw) });
      }
    }
  }
  return edits;
}

export interface ScaleEdit {
  /** scale step (`xxs`…`xxl`) */
  key: string;
  /** resolved CSS value — a typed step name becomes its `var(--mui-density-*)` ref */
  value: string;
}

// Scale-step overrides from the Density tab (`density.<key>` ids). A step is one
// CSS value — multi-token and self-referencing inputs (a CSS var cycle) are inert,
// mirroring how invalid mapping inputs are skipped.
export function collectScaleEdits(mapping: Record<string, string>): ScaleEdit[] {
  const out: ScaleEdit[] = [];
  for (const key of SCALE_KEYS) {
    const raw = (mapping[`density.${key}`] ?? '').trim();
    if (!raw) {
      continue;
    }
    const tokens = tokenize(raw);
    if (tokens.length !== 1 || tokens[0] === key) {
      continue;
    }
    out.push({ key, value: resolveValue(raw) });
  }
  return out;
}

export interface ThemeTokenEdit {
  path: readonly string[];
  value: string | number;
}

export function collectThemeTokenEdits(mapping: Record<string, string>): ThemeTokenEdit[] {
  const out: ThemeTokenEdit[] = [];
  for (const group of themeTokenGroups) {
    for (const slot of group.slots) {
      for (const knob of slot.knobs) {
        const raw = (mapping[knob.id] ?? '').trim();
        if (!raw) {
          continue;
        }
        out.push({ path: knob.path, value: coerceToken(raw, knob.numeric) });
      }
    }
  }
  return out;
}
