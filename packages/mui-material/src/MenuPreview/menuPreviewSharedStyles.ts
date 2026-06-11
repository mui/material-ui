import { CSSInterpolation } from '@mui/system';
import { dividerClasses } from '../Divider';
import { listItemIconClasses } from '../ListItemIcon';
import { listItemTextClasses } from '../ListItemText';
import memoTheme from '../utils/memoTheme';
import { Theme } from '../styles';

export interface SharedMenuPreviewItemClasses {
  highlighted: string;
  disabled: string;
  dense: string;
  divider: string;
  gutters: string;
  selected: string;
}

interface MenuPreviewItemVariantOwnerState {
  dense: boolean;
  divider: boolean;
  disableGutters: boolean;
}

export function getMenuPreviewItemStyles(
  theme: Theme,
  classes: SharedMenuPreviewItemClasses,
): CSSInterpolation {
  return {
    ...theme.typography.body1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    minHeight: 48,
    paddingTop: 6,
    paddingBottom: 6,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    cursor: 'default',
    userSelect: 'none',
    outline: 0,
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: (theme.vars || theme).palette.action.hover,
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    [`&.${classes.selected}`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.action.selectedOpacity,
      ),
      [`&.${classes.highlighted}`]: {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${
            (theme.vars || theme).palette.action.focusOpacity
          }`,
        ),
      },
    },
    [`&.${classes.selected}:hover`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        `${(theme.vars || theme).palette.action.selectedOpacity} + ${
          (theme.vars || theme).palette.action.hoverOpacity
        }`,
      ),
      '@media (hover: none)': {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.selectedOpacity,
        ),
      },
    },
    [`&.${classes.highlighted}`]: {
      backgroundColor: (theme.vars || theme).palette.action.focus,
    },
    [`&.${classes.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      pointerEvents: 'none',
    },
    [`& + .${dividerClasses.root}`]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    [`& + .${dividerClasses.inset}`]: {
      marginLeft: 52,
    },
    [`& .${listItemTextClasses.root}`]: {
      marginTop: 0,
      marginBottom: 0,
    },
    [`& .${listItemTextClasses.inset}`]: {
      paddingLeft: 36,
    },
    [`& .${listItemIconClasses.root}`]: {
      minWidth: 36,
    },
    variants: [
      {
        props: ({ ownerState }: { ownerState: MenuPreviewItemVariantOwnerState }) =>
          !ownerState.disableGutters,
        style: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
      {
        props: ({ ownerState }: { ownerState: MenuPreviewItemVariantOwnerState }) =>
          ownerState.divider,
        style: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          backgroundClip: 'padding-box',
        },
      },
      {
        props: ({ ownerState }: { ownerState: MenuPreviewItemVariantOwnerState }) =>
          !ownerState.dense,
        style: {
          [theme.breakpoints.up('sm')]: {
            minHeight: 'auto',
          },
        },
      },
      {
        props: ({ ownerState }: { ownerState: MenuPreviewItemVariantOwnerState }) =>
          ownerState.dense,
        style: {
          minHeight: 32,
          paddingTop: 4,
          paddingBottom: 4,
          ...theme.typography.body2,
          [`& .${listItemIconClasses.root} svg`]: {
            fontSize: '1.25rem',
          },
        },
      },
    ],
  };
}

export const menuPreviewPopupPaperStyles: CSSInterpolation = {
  maxHeight: 'calc(100% - 96px)',
  WebkitOverflowScrolling: 'touch',
};

export const menuPreviewPopupListStyles: CSSInterpolation = {
  outline: 0,
};

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
