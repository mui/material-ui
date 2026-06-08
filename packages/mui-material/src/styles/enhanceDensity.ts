import { Theme } from './createTheme';

/**
 * Named density steps, surfaced as `--mui-density-*` CSS vars. Components wired
 * by `enhanceDensity` pull their spacing tokens from these.
 */
export interface DensityScale {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface DensityOptions {
  /**
   * Override any density step. Defaults derive from `theme.spacing`.
   */
  scale?: Partial<DensityScale> | undefined;
}

type DensityKey = keyof DensityScale;

const densityKeys: DensityKey[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'];

// Default scale: t-shirt steps derived from the theme spacing unit.
const defaultMultiplier: Record<DensityKey, number> = {
  xxs: 0.5,
  xs: 0.75,
  sm: 1,
  md: 1.5,
  lg: 2,
  xl: 3,
};

const cssVar = (key: DensityKey) => `--mui-density-${key}`;

/**
 * Enhances a created theme with a holistic density layer.
 *
 * Does both jobs in one call (mirroring `enhanceHighContrast`):
 * 1. **Emits** the density scale as `--mui-density-*` CSS vars at `:root`
 *    (via `MuiCssBaseline` — requires `<CssBaseline />`) and exposes them on
 *    `theme.density` / `theme.vars.density`.
 * 2. **Maps** each component's sized tokens to density steps through injected
 *    `styleOverrides.root` (e.g. `--Button-medium-pad: var(--mui-density-xs) var(--mui-density-lg)`).
 *
 * `createTheme` is left untouched; without this function components render their
 * literal-px defaults. See `docs/adr/0001-css-var-density-adapter.md`.
 *
 * @param themeInput - The created theme to enhance.
 * @param options - Override the density scale.
 * @returns The enhanced theme.
 *
 * @example
 * const theme = enhanceDensity(createTheme({ cssVariables: true }));
 *
 * @example
 * const theme = enhanceDensity(createTheme(), { scale: { lg: '12px' } });
 */
export default function enhanceDensity<
  T extends {
    spacing: (value: number) => string | number;
    components?: Theme['components'] | undefined;
    vars?: Record<string, any> | undefined;
  },
>(themeInput: T, options?: DensityOptions): T & { density: DensityScale } {
  const scale = densityKeys.reduce((acc, key) => {
    acc[key] = options?.scale?.[key] ?? String(themeInput.spacing(defaultMultiplier[key]));
    return acc;
  }, {} as DensityScale);

  const rootVars = densityKeys.reduce<Record<string, string>>((acc, key) => {
    acc[cssVar(key)] = scale[key];
    return acc;
  }, {});

  const varRefs = densityKeys.reduce((acc, key) => {
    acc[key] = `var(${cssVar(key)})`;
    return acc;
  }, {} as DensityScale);

  const theme = { ...themeInput } as T & { density: DensityScale };
  theme.density = scale;
  theme.vars = { ...themeInput.vars, density: varRefs };

  const c = themeInput.components;
  const existingBaseline = c?.MuiCssBaseline?.styleOverrides;
  const baselineObject =
    existingBaseline && typeof existingBaseline === 'object' ? existingBaseline : undefined;

  theme.components = {
    ...c,
    MuiCssBaseline: {
      ...c?.MuiCssBaseline,
      styleOverrides: {
        ...baselineObject,
        ':root': {
          ...(baselineObject as any)?.[':root'],
          ...rootVars,
        },
      },
    },
    MuiButton: {
      ...c?.MuiButton,
      styleOverrides: {
        ...c?.MuiButton?.styleOverrides,
        root: [
          c?.MuiButton?.styleOverrides?.root,
          {
            // Sized-only: each size's `pad` shorthand (block inline) maps to its
            // own density step, so tuning the scale keeps the per-size matrix.
            '--Button-small-pad': `${varRefs.xxs} ${varRefs.sm}`,
            '--Button-medium-pad': `${varRefs.xs} ${varRefs.lg}`,
            '--Button-large-pad': `${varRefs.sm} ${varRefs.xl}`,
          },
        ],
      },
    },
    MuiChip: {
      ...c?.MuiChip,
      styleOverrides: {
        ...c?.MuiChip?.styleOverrides,
        root: [
          c?.MuiChip?.styleOverrides?.root,
          {
            '--Chip-small-height': varRefs.lg,
            '--Chip-medium-height': varRefs.xl,
            '--Chip-small-padInline': varRefs.sm,
            '--Chip-medium-padInline': varRefs.md,
          },
        ],
      },
    },
    MuiIconButton: {
      ...c?.MuiIconButton,
      styleOverrides: {
        ...c?.MuiIconButton?.styleOverrides,
        root: [
          c?.MuiIconButton?.styleOverrides?.root,
          {
            '--IconButton-small-pad': varRefs.xs,
            '--IconButton-medium-pad': varRefs.sm,
            '--IconButton-large-pad': varRefs.lg,
          },
        ],
      },
    },
    MuiMenuItem: {
      ...c?.MuiMenuItem,
      styleOverrides: {
        ...c?.MuiMenuItem?.styleOverrides,
        root: [
          c?.MuiMenuItem?.styleOverrides?.root,
          {
            '--MenuItem-minHeight': varRefs.xl,
            '--MenuItem-dense-minHeight': varRefs.lg,
            '--MenuItem-padBlock': varRefs.xs,
            '--MenuItem-dense-padBlock': varRefs.xxs,
            '--MenuItem-padInline': varRefs.lg,
            '--MenuItem-dense-padInline': varRefs.md,
          },
        ],
      },
    },
    MuiListItem: {
      ...c?.MuiListItem,
      styleOverrides: {
        ...c?.MuiListItem?.styleOverrides,
        root: [
          c?.MuiListItem?.styleOverrides?.root,
          {
            '--ListItem-padBlock': varRefs.sm,
            '--ListItem-dense-padBlock': varRefs.xxs,
            '--ListItem-padInline': varRefs.lg,
            '--ListItem-dense-padInline': varRefs.md,
          },
        ],
      },
    },
    MuiListItemButton: {
      ...c?.MuiListItemButton,
      styleOverrides: {
        ...c?.MuiListItemButton?.styleOverrides,
        root: [
          c?.MuiListItemButton?.styleOverrides?.root,
          {
            '--ListItemButton-padBlock': varRefs.sm,
            '--ListItemButton-dense-padBlock': varRefs.xs,
            '--ListItemButton-padInline': varRefs.lg,
            '--ListItemButton-dense-padInline': varRefs.md,
          },
        ],
      },
    },
    MuiListItemIcon: {
      ...c?.MuiListItemIcon,
      styleOverrides: {
        ...c?.MuiListItemIcon?.styleOverrides,
        root: [
          c?.MuiListItemIcon?.styleOverrides?.root,
          {
            '--ListItemIcon-minWidth': `calc(36px + ${varRefs.md})`,
          },
        ],
      },
    },
    MuiListItemText: {
      ...c?.MuiListItemText,
      styleOverrides: {
        ...c?.MuiListItemText?.styleOverrides,
        root: [
          c?.MuiListItemText?.styleOverrides?.root,
          {
            // Sized-only: regular vs dense compactness each maps to its own step.
            // marginBlock = vertical row spacing (smaller = denser); insetPad =
            // indentation.
            '--ListItemText-marginBlock': varRefs.xs,
            '--ListItemText-dense-marginBlock': varRefs.xxs,
            '--ListItemText-insetPad': `calc(${varRefs.xl} + ${varRefs.lg})`,
            '--ListItemText-dense-insetPad': varRefs.xl,
          },
        ],
      },
    },
    MuiListSubheader: {
      ...c?.MuiListSubheader,
      styleOverrides: {
        ...c?.MuiListSubheader?.styleOverrides,
        root: [
          c?.MuiListSubheader?.styleOverrides?.root,
          {
            // Base tokens (no size layer): map the agnostic seams directly.
            '--ListSubheader-height': varRefs.xl,
            '--ListSubheader-padInline': varRefs.md,
            '--ListSubheader-inset': `calc(${varRefs.xl} + ${varRefs.lg})`,
          },
        ],
      },
    },
    MuiToolbar: {
      ...c?.MuiToolbar,
      styleOverrides: {
        ...c?.MuiToolbar?.styleOverrides,
        root: [
          c?.MuiToolbar?.styleOverrides?.root,
          {
            // Only `dense` minHeight is tokenized (regular stays mixins.toolbar);
            // gutter padInline is a base token.
            '--Toolbar-dense-minHeight': varRefs.lg,
            '--Toolbar-padInline': varRefs.md,
          },
        ],
      },
    },
    MuiTab: {
      ...c?.MuiTab,
      styleOverrides: {
        ...c?.MuiTab?.styleOverrides,
        root: [
          c?.MuiTab?.styleOverrides?.root,
          {
            // Base tokens: Tab has no size prop, so map the agnostic seams
            // directly to density steps (no per-size tokens to route).
            '--Tab-padBlock': varRefs.sm,
            '--Tab-padInline': varRefs.lg,
            '--Tab-minHeight': `calc(${varRefs.xl} + ${varRefs.lg})`,
            '--Tab-iconSpacing': varRefs.xs,
          },
        ],
      },
    },
    MuiTablePagination: {
      ...c?.MuiTablePagination,
      styleOverrides: {
        ...c?.MuiTablePagination?.styleOverrides,
        root: [
          c?.MuiTablePagination?.styleOverrides?.root,
          {
            '--TablePagination-minHeight': `calc(${varRefs.xl} + ${varRefs.md})`,
            '--TablePagination-actionsSpacing': varRefs.lg,
            '--TablePagination-selectSpacing': varRefs.xl,
          },
        ],
      },
    },
    MuiCardContent: {
      ...c?.MuiCardContent,
      styleOverrides: {
        ...c?.MuiCardContent?.styleOverrides,
        root: [
          c?.MuiCardContent?.styleOverrides?.root,
          {
            // CardContent has no size prop -> base tokens (no per-size layer).
            '--CardContent-pad': varRefs.lg,
            '--CardContent-padBottom': varRefs.xl,
          },
        ],
      },
    },
    MuiSelect: {
      ...c?.MuiSelect,
      styleOverrides: {
        ...c?.MuiSelect?.styleOverrides,
        root: [
          c?.MuiSelect?.styleOverrides?.root,
          {
            // Base axis (no size layer) — single agnostic seam, mapped to a
            // mid-step so density nudges the select content-box floor uniformly.
            '--Select-minHeight': varRefs.lg,
          },
        ],
      },
    },
    MuiBreadcrumbs: {
      ...c?.MuiBreadcrumbs,
      styleOverrides: {
        ...c?.MuiBreadcrumbs?.styleOverrides,
        root: [
          c?.MuiBreadcrumbs?.styleOverrides?.root,
          {
            '--Breadcrumbs-separatorGap': varRefs.sm,
          },
        ],
      },
    },
    MuiInputAdornment: {
      ...c?.MuiInputAdornment,
      styleOverrides: {
        ...c?.MuiInputAdornment?.styleOverrides,
        root: [
          c?.MuiInputAdornment?.styleOverrides?.root,
          {
            '--InputAdornment-small-gap': varRefs.xxs,
            '--InputAdornment-medium-gap': varRefs.sm,
            '--InputAdornment-small-marginTop': varRefs.md,
            '--InputAdornment-medium-marginTop': varRefs.lg,
          },
        ],
      },
    },
    MuiBadge: {
      ...c?.MuiBadge,
      styleOverrides: {
        ...c?.MuiBadge?.styleOverrides,
        root: [
          c?.MuiBadge?.styleOverrides?.root,
          {
            '--Badge-standard-pad': `0 ${varRefs.sm}`,
            '--Badge-standard-size': varRefs.lg,
            '--Badge-dot-pad': '0px',
            '--Badge-dot-size': varRefs.xs,
          },
        ],
      },
    },
    MuiOutlinedInput: {
      ...c?.MuiOutlinedInput,
      styleOverrides: {
        ...c?.MuiOutlinedInput?.styleOverrides,
        root: [
          c?.MuiOutlinedInput?.styleOverrides?.root,
          {
            // Sized block/inline padding per size; block < inline to keep the
            // input's 16.5/14 feel.
            '--OutlinedInput-medium-padBlock': varRefs.md,
            '--OutlinedInput-small-padBlock': varRefs.sm,
            '--OutlinedInput-medium-padInline': varRefs.lg,
            '--OutlinedInput-small-padInline': varRefs.md,
          },
        ],
      },
    },
    MuiCheckbox: {
      ...c?.MuiCheckbox,
      styleOverrides: {
        ...c?.MuiCheckbox?.styleOverrides,
        root: [
          c?.MuiCheckbox?.styleOverrides?.root,
          {
            // Touch-target padding (9px default both sizes), via SwitchBase.
            '--Checkbox-medium-pad': varRefs.sm,
            '--Checkbox-small-pad': varRefs.xs,
          },
        ],
      },
    },
    MuiRadio: {
      ...c?.MuiRadio,
      styleOverrides: {
        ...c?.MuiRadio?.styleOverrides,
        root: [
          c?.MuiRadio?.styleOverrides?.root,
          {
            '--Radio-medium-pad': varRefs.sm,
            '--Radio-small-pad': varRefs.xs,
          },
        ],
      },
    },
    // Switch is intentionally not wired here: its geometry (width/height/thumbSize/
    // touchSize) is interlocked, not spacing-scale-derived. Tune it per size via
    // the public --Switch-<size>-* tokens directly.
  };

  return theme;
}
