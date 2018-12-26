export default ({ linked, linkInverted, muiBaseTheme, primary, white }) => {
  const root = {
    '&.icon--link-inverted': linkInverted,
    '&.icon--link': linked,
    '&.icon--white': {
      color: white.text,
    },
    '&.icon--small': {
      fontSize: 18,
    },
    '&.icon--contained': {
      padding: muiBaseTheme.spacing.unit / 2,
      width: 'calc(1em + 4px)',
      height: 'calc(1em + 4px)',
      borderRadius: '50%',
      color: muiBaseTheme.palette.common.white,
      '&.icon--red': {
        backgroundColor: 'red',
      },
      '&.icon--primary': {
        backgroundColor: primary.main,
      },
      '&.icon--purple': {
        backgroundColor: 'purple',
      },
    },
  };
  return {
    MuiSvgIcon: {
      root,
    },
    MuiIcon: {
      root,
    },
  };
};
