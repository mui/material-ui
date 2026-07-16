import { dividerClasses } from '../Divider';
import { listItemIconClasses } from '../ListItemIcon';
import { listItemTextClasses } from '../ListItemText';

export const menuItemOverridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ];
};

export function getMenuItemRootStyles(theme, classes, options = {}) {
  const focusVisibleClass = options.focusVisibleClass ?? classes.focusVisible;
  const disabledPointerEvents = options.disabledPointerEvents ?? false;

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
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    [`&.${classes.selected}`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.action.selectedOpacity,
      ),
      ...(focusVisibleClass && {
        [`&.${focusVisibleClass}`]: {
          backgroundColor: theme.alpha(
            (theme.vars || theme).palette.primary.main,
            `${(theme.vars || theme).palette.action.selectedOpacity} + ${
              (theme.vars || theme).palette.action.focusOpacity
            }`,
          ),
        },
      }),
    },
    [`&.${classes.selected}:hover`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        `${(theme.vars || theme).palette.action.selectedOpacity} + ${
          (theme.vars || theme).palette.action.hoverOpacity
        }`,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.selectedOpacity,
        ),
      },
    },
    ...(focusVisibleClass && {
      [`&.${focusVisibleClass}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
    }),
    [`&.${classes.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      ...(disabledPointerEvents && {
        pointerEvents: 'none',
        cursor: 'default',
      }),
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
        props: ({ ownerState }) => !ownerState.disableGutters,
        style: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
      {
        props: ({ ownerState }) => ownerState.divider,
        style: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          backgroundClip: 'padding-box',
        },
      },
      {
        props: ({ ownerState }) => !ownerState.dense,
        style: {
          [theme.breakpoints.up('sm')]: {
            minHeight: 'auto',
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.dense,
        style: {
          minHeight: 32, // https://m2.material.io/components/menus#specs > Dense
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
