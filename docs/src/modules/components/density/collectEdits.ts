import { densityGroups, densityRow } from './densityFields';
import { themeTokenGroups, coerceToken } from './themeTokens';
import {
  SCALE_KEYS,
  appendPxToNumeric,
  parseMapping,
  resolveValue,
  tokenize,
} from './mappingValue';
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
        // Bare numbers gain px (emotion parity) keyed off the emitted prop;
        // defaultProp rows skip it — buildOverrides number-coerces those.
        const prop = row.target.cssProp ?? row.target.privateVar;
        const resolved = resolveValue(raw);
        edits.push({ row, value: prop ? appendPxToNumeric(resolved, prop) : resolved });
      }
    }
  }
  // Theme-token → component dependency: the presets bake InputBase root and
  // FormLabel line-height FROM typography.body1.lineHeight at enhance time (a
  // literal — it can't track later theme edits). Re-derive them here when the
  // Typography tab edits body1.lineHeight, so the canvas AND export stay in
  // sync with the enhance-after-user-theme semantics of the real API. Both rows
  // are hidden knobs, so this is their only write path.
  const body1LineHeight = (mapping['typography.body1.lineHeight'] ?? '').trim();
  if (body1LineHeight) {
    for (const id of ['MuiInputBase|root|base||lineHeight', 'MuiFormLabel|root|base||lineHeight']) {
      const row = densityRow(id);
      if (row) {
        edits.push({ row, value: body1LineHeight });
      }
    }
  }
  return edits;
}

export interface ScaleEdit {
  /** scale step (`xx-small`…`xx-large`) */
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
    // Steps are always lengths — a bare number gains px (emotion parity).
    out.push({ key, value: appendPxToNumeric(resolveValue(raw)) });
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
