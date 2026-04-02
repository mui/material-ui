import type { Theme } from '../styles';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';

// Palette accessed with a dynamic color key from Object.entries(theme.palette).
// The `createSimplePaletteValueFilter` guarantees the entry is a valid palette color,
// but TypeScript can't narrow `string` to specific palette keys.
const p = (theme: Theme, color: string) =>
  ((theme.vars || theme).palette as Record<string, any>)[color] as {
    main: string;
    dark: string;
    contrastText: string;
  };

type ChipAdornmentEdge = 'start' | 'end';

function getChipAdornmentMarginStyles(
  edge: ChipAdornmentEdge,
  startMargin: number,
  endMargin: number,
) {
  return edge === 'start'
    ? { marginLeft: startMargin, marginRight: endMargin }
    : { marginLeft: endMargin, marginRight: startMargin };
}

/**
 * Class references needed by root styles for state-dependent selectors.
 * Each consumer (ChipButton, ChipLink) passes its own class constants.
 */
interface ChipRootClassRefs {
  focusVisible: string;
  disabled?: string | undefined;
}

/**
 * Base CSS properties shared by all chip root elements (legacy ChipRoot and new ChipNewApiRoot).
 * Extracted to prevent style drift between the two render paths.
 */
export function getChipBaseStyles(theme: Theme) {
  return {
    maxWidth: '100%',
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(13),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    lineHeight: 1.5,
    color: (theme.vars || theme).palette.text.primary,
    backgroundColor: (theme.vars || theme).palette.action.selected,
    borderRadius: 32 / 2,
    whiteSpace: 'nowrap' as const,
    transition: theme.transitions.create(['background-color', 'box-shadow']),
    cursor: 'unset',
    outline: 0,
    textDecoration: 'none',
    border: 0,
    padding: 0,
    verticalAlign: 'middle',
    boxSizing: 'border-box' as const,
  };
}

/**
 * Root element styles shared by ChipButton and ChipLink.
 *
 * The root acts as either the interactive element itself (non-overlay mode)
 * or a container div (overlay mode). The `interactive` ownerState flag
 * controls which styles are applied, driven by the `variants` array.
 */
export function getChipRootStyles(theme: Theme, classes: ChipRootClassRefs) {
  const hover = classes.disabled ? `&:not(.${classes.disabled}):hover` : '&:hover';
  return {
    ...getChipBaseStyles(theme),
    position: 'relative' as const,
    // Contain internal z-index layering (label, adornments, action ::after)
    // so it doesn't bleed into external stacking contexts (e.g. Popper).
    isolation: 'isolate' as const,
    ...(classes.disabled && {
      [`&.${classes.disabled}`]: {
        opacity: (theme.vars || theme).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
    }),
    variants: [
      // ---- Size ----
      {
        props: { size: 'small' },
        style: {
          height: 24,
        },
      },
      // ---- Colors (filled) ----
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['contrastText']))
        .map(([color]) => ({
          props: { color },
          style: {
            backgroundColor: p(theme, color).main,
            color: p(theme, color).contrastText,
          },
        })),
      // ---- Interactive (non-overlay) ----
      {
        props: { interactive: true },
        style: {
          userSelect: 'none' as const,
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer',
          [`&.${classes.focusVisible}`]: {
            backgroundColor: theme.alpha(
              (theme.vars || theme).palette.action.selected,
              `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
            ),
          },
          [hover]: {
            backgroundColor: theme.alpha(
              (theme.vars || theme).palette.action.selected,
              `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`,
            ),
          },
          '&:active': {
            boxShadow: (theme.vars || theme).shadows[1],
          },
        },
      },
      // ---- Interactive + color ----
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['dark']))
        .map(([color]) => ({
          props: { color, interactive: true },
          style: {
            [`${hover}, &.${classes.focusVisible}`]: {
              backgroundColor: p(theme, color).dark,
            },
          },
        })),
      // ---- Overlay mode (hasDelete): root is <div>, hover triggered by nested action ----
      {
        props: { interactive: false },
        style: {
          [`&.${classes.focusVisible}`]: {
            backgroundColor: theme.alpha(
              (theme.vars || theme).palette.action.selected,
              `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
            ),
          },
          [hover]: {
            backgroundColor: theme.alpha(
              (theme.vars || theme).palette.action.selected,
              `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`,
            ),
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['dark']))
        .map(([color]) => ({
          props: { color, interactive: false },
          style: {
            [`${hover}, &.${classes.focusVisible}`]: {
              backgroundColor: p(theme, color).dark,
            },
          },
        })),
      // ---- Outlined variant ----
      {
        props: { variant: 'outlined' },
        style: {
          backgroundColor: 'transparent',
          border: theme.vars
            ? `1px solid ${theme.vars.palette.Chip.defaultBorder}`
            : `1px solid ${
                theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]
              }`,
          [`&.${classes.focusVisible}`]: {
            backgroundColor: (theme.vars || theme).palette.action.focus,
          },
          [hover]: {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
        },
      },
      // ---- Outlined + color ----
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { variant: 'outlined', color },
          style: {
            color: p(theme, color).main,
            border: `1px solid ${theme.alpha(p(theme, color).main, 0.7)}`,
            [hover]: {
              backgroundColor: theme.alpha(
                p(theme, color).main,
                (theme.vars || theme).palette.action.hoverOpacity,
              ),
            },
            [`&.${classes.focusVisible}`]: {
              backgroundColor: theme.alpha(
                p(theme, color).main,
                (theme.vars || theme).palette.action.focusOpacity,
              ),
            },
          },
        })),
    ],
  };
}

/**
 * Action styles using the stretched-link pattern.
 *
 * The action element (`<button>` or `<a>`) sits in normal document flow and
 * contains the label text.  A `::after` pseudo-element stretches the click
 * target to cover the entire chip root (`position: relative`).
 */
export function getChipActionStyles(theme: Theme) {
  return {
    position: 'static' as const,
    display: 'inline-flex',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    borderRadius: 'inherit',
    color: 'inherit',
    font: 'inherit',
    textDecoration: 'none',
    outline: 0,
    WebkitTapHighlightColor: 'transparent',
    // Stretched-link: pseudo covers the chip root
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
      zIndex: 0,
    },
    '&:disabled, &[aria-disabled="true"]': {
      cursor: 'default',
    },
    // Fallback focus ring on the stretched pseudo-element.
    // Visible only when the Chip root's :has()-based focus styles are overridden or absent.
    '&:focus-visible::after': {
      outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
      outlineOffset: 2,
    },
  };
}

/**
 * Delete button styles.
 */
export function getChipDeleteStyles(theme: Theme) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    WebkitTapHighlightColor: 'transparent',
    color: theme.alpha((theme.vars || theme).palette.text.primary, 0.26),
    fontSize: 22,
    cursor: 'pointer',
    padding: 0,
    border: 'none',
    backgroundColor: 'transparent',
    position: 'relative' as const,
    zIndex: 1,
    pointerEvents: 'auto' as const,
    borderRadius: '50%',
    '&:hover': {
      color: theme.alpha((theme.vars || theme).palette.text.primary, 0.4),
    },
    '&:focus-visible': {
      outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
      outlineOffset: 2,
    },
    '&:disabled, &[aria-disabled="true"]': {
      cursor: 'default',
      '&:hover': {
        color: theme.alpha((theme.vars || theme).palette.text.primary, 0.26),
      },
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          fontSize: 16,
        },
      },
      // Per-color delete icon colors
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['contrastText']))
        .map(([color]) => ({
          props: { color },
          style: {
            color: theme.alpha(p(theme, color).contrastText, 0.7),
            '&:hover, &:active': {
              color: p(theme, color).contrastText,
            },
          },
        })),
      // Outlined + color delete icon colors
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { variant: 'outlined', color },
          style: {
            color: theme.alpha(p(theme, color).main, 0.7),
            '&:hover, &:active': {
              color: p(theme, color).main,
            },
          },
        })),
    ],
  };
}

/**
 * Adornment wrapper styles for passive icons, avatars, and `ChipDelete`.
 */
export function getChipAdornmentStyles(theme: Theme, edge: ChipAdornmentEdge) {
  const textColor =
    theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getChipAdornmentMarginStyles(edge, 5, -6),
    position: 'relative' as const,
    zIndex: 1,
    pointerEvents: 'none' as const,
    '&:has(> .MuiChipDelete-root)': {
      pointerEvents: 'auto' as const,
    },
    '& > .MuiSvgIcon-root': {
      fontSize: 20,
    },
    '& > .MuiAvatar-root': {
      width: 24,
      height: 24,
      color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
      fontSize: theme.typography.pxToRem(12),
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          ...getChipAdornmentMarginStyles(edge, 4, -4),
          '& > .MuiSvgIcon-root': {
            fontSize: 18,
          },
          '& > .MuiAvatar-root': {
            width: 18,
            height: 18,
            fontSize: theme.typography.pxToRem(10),
          },
        },
      },
      {
        props: { variant: 'outlined' },
        style: {
          ...getChipAdornmentMarginStyles(edge, 4, -6),
        },
      },
      {
        props: { variant: 'outlined', size: 'small' },
        style: {
          ...getChipAdornmentMarginStyles(edge, 2, -4),
        },
      },
      // Avatar color adjustments per chip color
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['contrastText', 'dark']))
        .map(([color]) => ({
          props: { color },
          style: {
            '& > .MuiAvatar-root': {
              color: p(theme, color).contrastText,
              backgroundColor: p(theme, color).dark,
            },
          },
        })),
    ],
  };
}
