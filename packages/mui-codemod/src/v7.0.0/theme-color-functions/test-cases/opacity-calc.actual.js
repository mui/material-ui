export const TreeItemContent =
  styled('div', {
    name: 'MuiTreeItem',
    slot: 'Content',
    overridesResolver: (props, styles) => styles.content,
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'status',
  }) <
  { status: UseTreeItemStatus } >
  (({ theme }) => ({
    padding: theme.spacing(0.5, 1),
    paddingLeft: `calc(${theme.spacing(1)} + var(--TreeView-itemChildrenIndentation) * var(--TreeView-itemDepth))`,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    boxSizing: 'border-box', // prevent width + padding to overflow
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&[data-disabled]': {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
      backgroundColor: 'transparent',
    },
    '&[data-focused]': {
      backgroundColor: (theme.vars || theme).palette.action.focus,
    },
    '&[data-selected]': {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
        : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
          : alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
            ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
            : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
    },
    '&[data-selected][data-focused]': {
      backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
        : alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
          ),
    },
  }));
