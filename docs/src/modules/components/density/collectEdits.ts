import { densityGroups, densityRow } from './densityFields';
import { themeTokenGroups, coerceToken } from './themeTokens';
import { parseMapping, resolveValue } from './mappingValue';
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
