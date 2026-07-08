import {
  createTheme,
  enhanceCompactDensity,
  enhanceNormalDensity,
  enhanceComfortDensity,
} from '@mui/material/styles';
import { buildOverrides, mergeOntoPreset } from './buildDensityOverrides';
import { collectDensityEdits, collectThemeTokenEdits } from './collectEdits';
import type { ExportInput, ExportPresetPayload } from './buildExportSource';

export type { ExportInput } from './buildExportSource';

// Builds the buildExportSource input from the current mapping. The PLAYGROUND may
// call enhance*Density (linked package) — only the GENERATED FILE must not import
// them. Shared by the Export button and the unit tests, and reusing
// collectDensityEdits + mergeOntoPreset keeps export = canvas by construction.

const PRESET_FN = {
  compact: enhanceCompactDensity,
  normal: enhanceNormalDensity,
  comfort: enhanceComfortDensity,
} as const;

type Level = keyof typeof PRESET_FN;

// The preset's own theme.typography patch: every primitive that differs from the
// base theme (compact's type reflow; empty for normal/comfort today).
function typographyPatch(
  base: Record<string, any>,
  enhanced: Record<string, any>,
): ExportPresetPayload['typography'] {
  const patch: ExportPresetPayload['typography'] = {};
  for (const [variant, styles] of Object.entries(enhanced)) {
    if (!styles || typeof styles !== 'object') {
      continue;
    }
    for (const [prop, value] of Object.entries(styles)) {
      if (
        (typeof value === 'string' || typeof value === 'number') &&
        (base[variant] as Record<string, unknown> | undefined)?.[prop] !== value
      ) {
        (patch[variant] ??= {})[prop] = value;
      }
    }
  }
  return patch;
}

// addRootOverride/mergeOntoPreset produce nested `[prev, next]` slot arrays with
// undefined leading layers (emotion flattens them at render). The exported file
// carries clean FLAT arrays instead — same order, same result, readable output.
function flattenSlots(
  components: Record<string, any>,
): Record<string, { styleOverrides: Record<string, unknown> }> {
  return Object.fromEntries(
    Object.entries(components).map(([name, def]) => [
      name,
      {
        ...def,
        styleOverrides: Object.fromEntries(
          Object.entries((def as any).styleOverrides ?? {}).map(([slot, layer]) => [
            slot,
            Array.isArray(layer) ? layer.flat(Infinity).filter(Boolean) : layer,
          ]),
        ),
      },
    ]),
  );
}

export function buildExportInput(mapping: Record<string, string>): ExportInput {
  const userLayer = buildOverrides(collectDensityEdits(mapping));
  const base = createTheme({ cssVariables: true });
  const presets = (Object.keys(PRESET_FN) as Level[]).map((name): ExportPresetPayload => {
    const enhanced = PRESET_FN[name](createTheme({ cssVariables: true })) as unknown as {
      density: Record<string, string>;
      components: Record<string, any>;
      typography: Record<string, any>;
    };
    // MuiCssBaseline excluded — the scale block is emitted separately by the file.
    const { MuiCssBaseline, ...presetComponents } = enhanced.components ?? {};
    return {
      name,
      scale: Object.fromEntries(
        Object.entries(enhanced.density).map(([key, px]) => [`--mui-density-${key}`, px]),
      ),
      components: flattenSlots(mergeOntoPreset(presetComponents, userLayer)),
      typography: typographyPatch(base.typography as Record<string, any>, enhanced.typography),
    };
  });
  return { presets, themeTokenEdits: collectThemeTokenEdits(mapping) };
}
