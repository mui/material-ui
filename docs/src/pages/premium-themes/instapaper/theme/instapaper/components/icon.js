export default ({ attach, linked, linkInverted, theme, primary, white, ICON }) => {
  const root = {
    [attach(ICON.linkInverted)]: linkInverted,
    [attach(ICON.link)]: {
      ...linked,
      color: 'initial',
    },
    [attach(ICON.white)]: {
      color: white.text,
    },
    [attach(ICON.small)]: {
      fontSize: 18,
    },
    [attach(ICON.contained)]: {
      padding: theme.spacing(0.5),
      width: 'calc(1em + 4px)',
      height: 'calc(1em + 4px)',
      borderRadius: '50%',
      color: theme.palette.common.white,
      [attach(ICON.red)]: {
        backgroundColor: 'red',
      },
      [attach(ICON.primary)]: {
        backgroundColor: primary.main,
      },
      [attach(ICON.purple)]: {
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
