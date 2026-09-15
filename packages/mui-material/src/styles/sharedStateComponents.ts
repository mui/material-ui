import type { CSSObject } from '@mui/system';
import type { ColorStates, StatefulTheme } from './createStates';

/**
 * PRIVATE shared component mapping behind `enhanceColorStates` (not re-exported
 * from the styles barrel — the enhancer is the public surface). Sibling of
 * `sharedDensityComponents.ts`: one module re-authoring many families rather than
 * the same edit repeated in every component.
 *
 * NOTHING IS DERIVED HERE. `theme.states` already holds ready-to-use styles; this
 * module only applies them at each component's own selectors.
 *
 * Overrides are FUNCTIONS so they resolve against the theme a component actually
 * renders with, which keeps them correct if the theme is re-composed later.
 */

/** Compose our root styles under any the user already registered — theirs wins. */
function addRootOverride(
  components: Record<string, any>,
  name: string,
  ours: (props: { theme: StatefulTheme }) => CSSObject,
) {
  const existing = components[name] ?? {};
  const overrides = existing.styleOverrides ?? {};
  const theirs = overrides.root;
  components[name] = {
    ...existing,
    styleOverrides: {
      ...overrides,
      root: (props: { theme: StatefulTheme }) => ({
        ...ours(props),
        ...(typeof theirs === 'function' ? theirs(props) : theirs),
      }),
    },
  };
}

export default function applySharedStates<T extends StatefulTheme>(theme: T): void {
  const components = theme.components as Record<string, any>;

  // MenuItem paints `backgroundColor` directly, so each named state is applied
  // straight at its own selector. Hover sits inside `@media (hover: hover)` and so
  // never applies on touch — which is why nothing here needs a `hover: none` reset.
  addRootOverride(components, 'MuiMenuItem', ({ theme: t }) => ({
    '&:active': t.states?.default?.active,
    '&.Mui-selected': t.states?.default?.selected,
    '&.Mui-disabled': t.states?.default?.disabled,
    '@media (hover: hover)': {
      '&:hover': t.states?.default?.hover,
      '&.Mui-selected:hover': t.states?.default?.selectedHover,
    },
  }));

  // Button paints through private `--variant-*` custom properties, which decompose
  // 3 variants x N colors into 3 + N rules. That indirection is worth keeping, so
  // the values are unpacked onto those properties here — the one place this file
  // holds component-private knowledge, and the reason it needs a test asserting
  // those variable names still exist in the component's output.
  addRootOverride(components, 'MuiButton', ({ theme: t }) => ({
    '&.Mui-disabled': t.states?.default?.disabled,
    // The ghost tints are COLOUR-INDEPENDENT, so they are supplied colour-
    // independently — at the root, not inside the per-colour variants below.
    // The component gates them on `states.default` alone; emitting them per
    // colour would close the gate for every colour while supplying only the
    // configured ones, which silently deletes hover from the rest.
    ...(t.states?.default
      ? {
          '@media (hover: hover)': {
            '&:hover': {
              '--variant-textBg': t.states.default.hover.backgroundColor,
              '--variant-outlinedBg': t.states.default.hover.backgroundColor,
            },
          },
          '&:active': {
            '--variant-textBg': t.states.default.active.backgroundColor,
            '--variant-outlinedBg': t.states.default.active.backgroundColor,
          },
        }
      : null),
    variants: Object.keys(t.states ?? {})
      .filter((key) => key !== 'default')
      .map((color) => {
        const state = t.states?.[color] as ColorStates;
        return {
          props: { color },
          style: {
            '@media (hover: hover)': {
              '&:hover': {
                '--variant-containedBg': state.hover.backgroundColor,
                '--variant-outlinedBorder': state.hover.borderColor,
              },
            },
            '&:active': {
              '--variant-containedBg': state.active.backgroundColor,
              '--variant-outlinedBorder': state.active.borderColor,
            },
          },
        };
      }),
  }));
}
