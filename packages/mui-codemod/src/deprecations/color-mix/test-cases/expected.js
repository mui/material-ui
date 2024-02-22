({ theme, ownerState }) => {
  const textColor =
    theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];
  return {
    [`& .${chipClasses.deleteIcon}`]: {
      WebkitTapHighlightColor: 'transparent',
      color: theme.vars
        ? `color-mix(${theme.vars.palette.text.primary} / 0.26)`
        : alpha(theme.palette.text.primary, 0.26),
      fontSize: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: theme.vars
          ? `color-mix(${theme.vars.palette.text.primary} / 0.4)`
          : alpha(theme.palette.text.primary, 0.4),
      },
      ...(ownerState.size === 'small' && {
        fontSize: 16,
        marginRight: 4,
        marginLeft: -4,
      }),
      ...(ownerState.color !== 'default' && {
        color: theme.vars
          ? `color-mix(${theme.vars.palette[ownerState.color].contrastText} / 0.7)`
          : alpha(theme.palette[ownerState.color].contrastText, 0.7),
        '&:hover, &:active': {
          color: (theme.vars || theme).palette[ownerState.color].contrastText,
        },
      }),
    },
    ...(ownerState.onDelete && {
      [`&.${chipClasses.focusVisible}`]: {
        backgroundColor: theme.vars
          ? `color-mix(${theme.vars.palette.action.selected} / transparent ${((theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity) * 100).toFixed(2)}%)`
          : alpha(
              theme.palette.action.selected,
              theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
            ),
      },
    }),
    ...(ownerState.variant === 'outlined' &&
      ownerState.color !== 'inherit' && {
        color: (theme.vars || theme).palette[ownerState.color].main,
        border: theme.vars
          ? `color-mix(${theme.vars.palette[ownerState.color].main} / 0.5)`
          : `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`,
      }),
    '&[aria-selected="true"]': {
      backgroundColor: theme.vars
        ? `color-mix(${theme.vars.palette.primary.main} / transparent ${(theme.palette.action.selectedOpacity * 100).toFixed(0)}%)`
        : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      [`&.${autocompleteClasses.focused}`]: {
        backgroundColor: theme.vars
          ? `color-mix(${theme.vars.palette.primary.main} / transparent ${((theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity) * 100).toFixed(2)}%)`
          : alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
            ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: (theme.vars || theme).palette.action.selected,
        },
      },
      [`&.${autocompleteClasses.focusVisible}`]: {
        backgroundColor: theme.vars
          ? `color-mix(${theme.vars.palette.primary.main} / transparent ${((theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity) * 100).toFixed(2)}%)`
          : alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
            ),
      },
    },
  };
};
