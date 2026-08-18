import {
  createTheme,
  enhanceHighDensity,
  enhanceMediumDensity,
  enhanceLowDensity,
} from '@mui/material/styles';
import { buildOverrides, mergeOntoPreset } from './buildDensityOverrides';
import { collectDensityEdits, collectScaleEdits, collectThemeTokenEdits } from './collectEdits';
import { resolveSpacingCalcPx, shortenDensityVars } from './mappingValue';
import { PRESET_THEME_INPUT } from './themeTokens';
import { USER_LAYER_KEY, USER_VALUE_KEY } from './buildExportSource';
import type { ExportInput, ExportPresetPayload } from './buildExportSource';

export type { ExportInput } from './buildExportSource';

// Builds the buildExportSource input from the per-preset mapping workspaces.
// The PLAYGROUND may call enhance*Density (linked package) — only the GENERATED
// FILE must not import them. Shared by the Export button and the unit tests, and
// reusing collectDensityEdits + mergeOntoPreset keeps export = canvas by
// construction. Each preset's payload carries ITS OWN workspace's edits.

const PRESET_FN = {
  high: enhanceHighDensity,
  medium: enhanceMediumDensity,
  low: enhanceLowDensity,
} as const;

type Level = keyof typeof PRESET_FN;

export type MappingByPreset = Record<Level, Record<string, string>>;

// The composition layer's theme.typography input. Authorship-first: every
// PRESET_THEME_INPUT leaf exports even when its value equals the MUI default —
// it's spec'd, and the export survives upstream default drift. Value-diff
// fallback for themes without an input.
function typographyPatch(
  base: Record<string, any>,
  enhanced: Record<string, any>,
  recorded?: Record<string, Record<string, string | number>>,
): ExportPresetPayload['typography'] {
  const patch: ExportPresetPayload['typography'] = {};
  if (recorded) {
    for (const [variant, styles] of Object.entries(recorded)) {
      patch[variant] = { ...styles };
    }
    return patch;
  }
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

export function buildExportInput(mappingByPreset: MappingByPreset): ExportInput {
  const base = createTheme({ cssVariables: true });
  const presets = (Object.keys(PRESET_FN) as Level[]).map((name): ExportPresetPayload => {
    const workspace = mappingByPreset[name] ?? {};
    const userLayer = buildOverrides(collectDensityEdits(workspace));
    // Mark each user slot layer so the serializer wraps it in code comments —
    // the generated file distinguishes playground edits from the preset baseline.
    for (const def of Object.values(userLayer)) {
      for (const layer of Object.values(def.styleOverrides)) {
        (layer as Record<string, unknown>)[USER_LAYER_KEY] = true;
      }
    }
    // Compose the userland layer BEFORE enhancing — mirrors the playground's
    // presetTheme. Matters beyond the token sections: shared emissions derive
    // from the incoming theme's type (InputBase/FormLabel/Tab lineHeight follow
    // body1/button), so a bare theme would bake master metrics.
    const input = PRESET_THEME_INPUT[name];
    const enhanced = PRESET_FN[name](
      createTheme({
        cssVariables: true,
        spacing: input.spacing,
        typography: input.typography,
        shape: input.shape,
      }),
    ) as unknown as {
      density: Record<string, string>;
      components: Record<string, any>;
      typography: Record<string, any>;
    };
    const presetComponents = enhanced.components ?? {};
    // This preset's user token edits: typography variants layer over the preset's
    // own reflow patch; shape (borderRadius) is its own section. User-edited
    // leaves are wrapped so the serializer tags them with `// playground edit`.
    const typography: ExportPresetPayload['typography'] = typographyPatch(
      base.typography as Record<string, any>,
      enhanced.typography,
      input.typography,
    );
    // Seeded from the composition input (authorship-first, like typography).
    const shape: ExportPresetPayload['shape'] = { ...input.shape };
    // theme.spacing base — the preset default (high tightens to 6), overridable
    // via the Spacing knob. Baked only when it differs from the MUI default (8) or
    // is edited; an edit is tagged `// playground edit`.
    const spacingDefault = input.spacing;
    let spacing: ExportPresetPayload['spacing'] = spacingDefault !== 8 ? spacingDefault : undefined;
    for (const edit of collectThemeTokenEdits(workspace)) {
      if (edit.path[0] === 'typography') {
        const [, variant, prop] = edit.path;
        (typography[variant] ??= {})[prop] = { [USER_VALUE_KEY]: edit.value };
      } else if (edit.path[0] === 'shape') {
        shape[edit.path[1]] = { [USER_VALUE_KEY]: edit.value };
      } else if (edit.path[0] === 'spacing') {
        spacing = { [USER_VALUE_KEY]: edit.value as number };
      }
    }
    // Effective scale (a DensityScale): the preset's px per step, with Density-tab
    // step edits applied. A step alias (e.g. md → xs) resolves to the referenced
    // step's px. theme.density carries spacing-calc strings on the vars preset
    // theme — resolved to px here (the export has no scaling section yet → dial 1).
    const scalePx: Record<string, string> = Object.fromEntries(
      Object.entries(enhanced.density).map(([k, v]) => [k, resolveSpacingCalcPx(v as string)]),
    );
    const editedSteps = new Set<string>();
    for (const edit of collectScaleEdits(workspace)) {
      const ref = shortenDensityVars(edit.value); // 'var(--mui-density-x-small)' → 'x-small'; '10px' → '10px'
      scalePx[edit.key] = scalePx[ref] ?? ref;
      editedSteps.add(edit.key);
    }
    // Scale payload — bare step keys (exposed on theme.density); edited steps
    // wrapped so the serializer tags them `// playground edit`.
    const scale: ExportPresetPayload['scale'] = Object.fromEntries(
      Object.entries(scalePx).map(([key, px]) => [
        key,
        editedSteps.has(key) ? { [USER_VALUE_KEY]: px } : px,
      ]),
    );
    return {
      name,
      scale,
      components: flattenSlots(
        mergeOntoPreset(presetComponents, userLayer),
      ) as ExportPresetPayload['components'],
      typography,
      shape,
      spacing,
    };
  });
  return { presets };
}
