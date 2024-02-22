const ChipRoot = styled('div', {
  name: 'MuiChip',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { color, iconColor, clickable, onDelete, size, variant } = ownerState;

    return [
      { [`& .${chipClasses.avatar}`]: styles.avatar },
      { [`& .${chipClasses.avatar}`]: styles[`avatar${capitalize(size)}`] },
      { [`& .${chipClasses.avatar}`]: styles[`avatarColor${capitalize(color)}`] },
      { [`& .${chipClasses.icon}`]: styles.icon },
      { [`& .${chipClasses.icon}`]: styles[`icon${capitalize(size)}`] },
      { [`& .${chipClasses.icon}`]: styles[`iconColor${capitalize(iconColor)}`] },
      { [`& .${chipClasses.deleteIcon}`]: styles.deleteIcon },
      { [`& .${chipClasses.deleteIcon}`]: styles[`deleteIcon${capitalize(size)}`] },
      { [`& .${chipClasses.deleteIcon}`]: styles[`deleteIconColor${capitalize(color)}`] },
      {
        [`& .${chipClasses.deleteIcon}`]:
          styles[`deleteIcon${capitalize(variant)}Color${capitalize(color)}`],
      },
      styles.root,
      styles[`size${capitalize(size)}`],
      styles[`color${capitalize(color)}`],
      clickable && styles.clickable,
      clickable && color !== 'default' && styles[`clickableColor${capitalize(color)})`],
      onDelete && styles.deletable,
      onDelete && color !== 'default' && styles[`deletableColor${capitalize(color)}`],
      styles[variant],
      styles[`${variant}${capitalize(color)}`],
    ];
  },
})(
  ({ theme, ownerState }) => {
    const textColor =
      theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300];
    return {
      maxWidth: '100%',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(13),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      color: (theme.vars || theme).palette.text.primary,
      backgroundColor: (theme.vars || theme).palette.action.selected,
      borderRadius: 32 / 2,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['background-color', 'box-shadow']),
      // reset cursor explicitly in case ButtonBase is used
      cursor: 'unset',
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 0,
      textDecoration: 'none',
      border: 0, // Remove `button` border
      padding: 0, // Remove `button` padding
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      [`&.${chipClasses.disabled}`]: {
        opacity: (theme.vars || theme).palette.action.disabledOpacity,
        pointerEvents: 'none',
      },
      [`& .${chipClasses.avatar}`]: {
        marginLeft: 5,
        marginRight: -6,
        width: 24,
        height: 24,
        color: theme.vars ? theme.vars.palette.Chip.defaultAvatarColor : textColor,
        fontSize: theme.typography.pxToRem(12),
      },
      [`& .${chipClasses.avatarColorPrimary}`]: {
        color: (theme.vars || theme).palette.primary.contrastText,
        backgroundColor: (theme.vars || theme).palette.primary.dark,
      },
      [`& .${chipClasses.avatarColorSecondary}`]: {
        color: (theme.vars || theme).palette.secondary.contrastText,
        backgroundColor: (theme.vars || theme).palette.secondary.dark,
      },
      [`& .${chipClasses.avatarSmall}`]: {
        marginLeft: 4,
        marginRight: -4,
        width: 18,
        height: 18,
        fontSize: theme.typography.pxToRem(10),
      },
      [`& .${chipClasses.icon}`]: {
        marginLeft: 5,
        marginRight: -6,
        ...(ownerState.size === 'small' && {
          fontSize: 18,
          marginLeft: 4,
          marginRight: -4,
        }),
        ...(ownerState.iconColor === ownerState.color && {
          color: theme.vars ? theme.vars.palette.Chip.defaultIconColor : textColor,
          ...(ownerState.color !== 'default' && {
            color: 'inherit',
          }),
        }),
      },
      [`& .${chipClasses.deleteIcon}`]: {
        WebkitTapHighlightColor: 'transparent',
        color: theme.vars
          ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.26)`
          : alpha(theme.palette.text.primary, 0.26),
        fontSize: 22,
        cursor: 'pointer',
        margin: '0 5px 0 -6px',
        '&:hover': {
          color: theme.vars
            ? `rgba(${theme.vars.palette.text.primaryChannel} / 0.4)`
            : alpha(theme.palette.text.primary, 0.4),
        },
        ...(ownerState.size === 'small' && {
          fontSize: 16,
          marginRight: 4,
          marginLeft: -4,
        }),
        ...(ownerState.color !== 'default' && {
          color: theme.vars
            ? `rgba(${theme.vars.palette[ownerState.color].contrastTextChannel} / 0.7)`
            : alpha(theme.palette[ownerState.color].contrastText, 0.7),
          '&:hover, &:active': {
            color: (theme.vars || theme).palette[ownerState.color].contrastText,
          },
        }),
      },
      ...(ownerState.size === 'small' && {
        height: 24,
      }),
      ...(ownerState.color !== 'default' && {
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main,
        color: (theme.vars || theme).palette[ownerState.color].contrastText,
      }),
      ...(ownerState.onDelete && {
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
            : alpha(
                theme.palette.action.selected,
                theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
              ),
        },
      }),
      ...(ownerState.onDelete &&
        ownerState.color !== 'default' && {
          [`&.${chipClasses.focusVisible}`]: {
            backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
          },
        }),
    };
  },
  ({ theme, ownerState }) => ({
    ...(ownerState.clickable && {
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
          : alpha(
              theme.palette.action.selected,
              theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
            ),
      },
      [`&.${chipClasses.focusVisible}`]: {
        backgroundColor: theme.vars
          ? `rgba(${theme.vars.palette.action.selectedChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
          : alpha(
              theme.palette.action.selected,
              theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
            ),
      },
      '&:active': {
        boxShadow: (theme.vars || theme).shadows[1],
      },
    }),
    ...(ownerState.clickable &&
      ownerState.color !== 'default' && {
        [`&:hover, &.${chipClasses.focusVisible}`]: {
          backgroundColor: (theme.vars || theme).palette[ownerState.color].dark,
        },
      }),
  }),
  ({ theme, ownerState }) => ({
    ...(ownerState.variant === 'outlined' && {
      backgroundColor: 'transparent',
      border: theme.vars
        ? `1px solid ${theme.vars.palette.Chip.defaultBorder}`
        : `1px solid ${
            theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]
          }`,
      [`&.${chipClasses.clickable}:hover`]: {
        backgroundColor: (theme.vars || theme).palette.action.hover,
      },
      [`&.${chipClasses.focusVisible}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
      [`& .${chipClasses.avatar}`]: {
        marginLeft: 4,
      },
      [`& .${chipClasses.avatarSmall}`]: {
        marginLeft: 2,
      },
      [`& .${chipClasses.icon}`]: {
        marginLeft: 4,
      },
      [`& .${chipClasses.iconSmall}`]: {
        marginLeft: 2,
      },
      [`& .${chipClasses.deleteIcon}`]: {
        marginRight: 5,
      },
      [`& .${chipClasses.deleteIconSmall}`]: {
        marginRight: 3,
      },
    }),
    ...(ownerState.variant === 'outlined' &&
      ownerState.color !== 'default' && {
        color: (theme.vars || theme).palette[ownerState.color].main,
        border: `1px solid ${
          theme.vars
            ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.7)`
            : alpha(theme.palette[ownerState.color].main, 0.7)
        }`,
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${
                theme.vars.palette.action.hoverOpacity
              })`
            : alpha(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
        },
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / ${
                theme.vars.palette.action.focusOpacity
              })`
            : alpha(theme.palette[ownerState.color].main, theme.palette.action.focusOpacity),
        },
        [`& .${chipClasses.deleteIcon}`]: {
          color: theme.vars
            ? `rgba(${theme.vars.palette[ownerState.color].mainChannel} / 0.7)`
            : alpha(theme.palette[ownerState.color].main, 0.7),
          '&:hover, &:active': {
            color: (theme.vars || theme).palette[ownerState.color].main,
          },
        },
      }),
  }),
);
