import { CSSInterpolation } from '@mui/system';
import memoTheme from '../utils/memoTheme';
import { Theme } from '../styles';
import { menuListStyles, menuPaperStyles } from '../Menu/menuStyles';
import { getMenuItemRootStyles } from '../MenuItem/menuItemStyles';

export interface SharedMenuPreviewItemClasses {
  highlighted: string;
  disabled: string;
  dense: string;
  divider: string;
  gutters: string;
  selected: string;
  open?: (string) | undefined;
}

export function getMenuPreviewItemStyles(
  theme: Theme,
  classes: SharedMenuPreviewItemClasses,
): CSSInterpolation {
  const selectedFocusBackgroundColor = theme.alpha(
    (theme.vars || theme).palette.primary.main,
    `${(theme.vars || theme).palette.action.selectedOpacity} + ${
      (theme.vars || theme).palette.action.focusOpacity
    }`,
  );

  return {
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    border: 0,
    margin: 0,
    borderRadius: 0,
    color: 'inherit',
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    outline: 0,
    '&::-moz-focus-inner': {
      borderStyle: 'none',
    },
    ...getMenuItemRootStyles(theme, classes, {
      focusVisibleClass: classes.highlighted,
      disabledPointerEvents: true,
    }),
    ...(classes.open && {
      [`&.${classes.open}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
      [`&.${classes.selected}.${classes.open}`]: {
        backgroundColor: selectedFocusBackgroundColor,
      },
    }),
  };
}

export const menuPreviewPopupPaperStyles: CSSInterpolation = menuPaperStyles;

export const menuPreviewPopupListStyles: CSSInterpolation = menuListStyles;

export const menuPreviewIndicatorStyles = memoTheme(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 36,
  color: (theme.vars || theme).palette.action.active,
  '& [data-mui-menu-preview-indicator-icon]': {
    display: 'inline-block',
    flexShrink: 0,
    width: '1.25rem',
    height: '1.25rem',
    fill: 'currentColor',
  },
  '& [data-mui-menu-preview-checkbox-checkmark]': {
    fill: (theme.vars || theme).palette.background.paper,
  },
  '&[data-unchecked] [data-mui-menu-preview-indicator-mark]': {
    visibility: 'hidden',
  },
}));
