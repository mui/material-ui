export default ({ attach, nest, ICON, ICON_BUTTON, linkInverted, theme }) => ({
  MuiIconButton: {
    root: {
      padding: 8,
      [attach(ICON_BUTTON.shaded)]: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
      [attach(ICON_BUTTON.noPad)]: {
        padding: 0,
      },
      [attach(ICON_BUTTON.narrowPad)]: {
        padding: 4,
      },
      [attach(ICON_BUTTON.separated)]: {
        position: 'relative',
        [nest(ICON.front)]: {
          transition: '0.15s ease',
        },
        [nest(ICON.caret)]: {
          transition: '0.15s ease',
          position: 'absolute',
          visibility: 'hidden',
          opacity: 0,
          right: 2,
        },
        '&:hover': {
          [nest(ICON.front)]: {
            transform: 'translateX(-6px)',
          },
          [nest(ICON.frontFlipped)]: {
            transform: 'translateX(-6px) rotateZ(-20deg)',
          },
          [nest(ICON.caret)]: {
            visibility: 'visible',
            opacity: 1,
            right: -4,
          },
        },
      },
      [attach(ICON_BUTTON.linkInverted)]: {
        [nest(ICON.root)]: linkInverted,
        '&:hover': {
          [nest(ICON.root)]: {
            color: theme.palette.common.white,
          },
        },
      },
    },
  },
});
