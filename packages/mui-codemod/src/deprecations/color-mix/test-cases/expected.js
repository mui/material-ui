({ theme, ownerState }) => {
  const textColor =
    theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];
  return {
    [`& .${chipClasses.deleteIcon}`]: {
      WebkitTapHighlightColor: 'transparent',
      color: theme.vars
        ? `color-mix(in var(--color-space), ${theme.vars.palette.text.primary}, transparent 74%)`
        : alpha(theme.palette.text.primary, 0.26),
      fontSize: 22,
      cursor: 'pointer',
      margin: '0 5px 0 -6px',
      '&:hover': {
        color: theme.vars
          ? `color-mix(in var(--color-space), ${theme.vars.palette.text.primary}, transparent 60%)`
          : alpha(theme.palette.text.primary, 0.4),
      },
      ...(ownerState.variant === 'text' &&
        ownerState.color !== 'inherit' && {
          backgroundColor: theme.vars
            ? `color-mix(in var(--color-space), ${theme.vars.palette[ownerState.color].main}, transparent ${(100 - theme.palette.action.hoverOpacity * 100).toFixed(0)}%)`
            : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        }),
      ...(ownerState.size === 'small' && {
        fontSize: 16,
        marginRight: 4,
        marginLeft: -4,
      }),
      ...(ownerState.color !== 'default' && {
        color: theme.vars
          ? `color-mix(in var(--color-space), ${theme.vars.palette[ownerState.color].contrastText}, transparent 30%)`
          : alpha(theme.palette[ownerState.color].contrastText, 0.7),
        '&:hover, &:active': {
          color: (theme.vars || theme).palette[ownerState.color].contrastText,
        },
      }),
    },
    ...(ownerState.onDelete && {
      [`&.${chipClasses.focusVisible}`]: {
        backgroundColor: theme.vars
          ? `color-mix(in var(--color-space), ${theme.vars.palette.action.selected}, transparent ${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}%)`
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
          ? `1px solid color-mix(in var(--color-space), ${theme.vars.palette[ownerState.color].main}, transparent 50%)`
          : `1px solid ${alpha(theme.palette[ownerState.color].main, 0.5)}`,
      }),
    '&[aria-selected="true"]': {
      backgroundColor: theme.vars
        ? `color-mix(in var(--color-space), ${theme.vars.palette.primary.main}, transparent ${theme.vars.palette.action.selectedOpacity}%)`
        : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      [`&.${autocompleteClasses.focused}`]: {
        backgroundColor: theme.vars
          ? `color-mix(in var(--color-space), ${theme.vars.palette.primary.main}, transparent ${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}%)`
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
          ? `color-mix(in var(--color-space), ${theme.vars.palette.primary.main}, transparent ${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}%)`
          : alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
            ),
      },
    },
  };
};
