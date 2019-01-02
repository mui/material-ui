export default ({ attach, ICON }) => {
  const root = {
    [attach(ICON.text)]: {
      fontSize: 15,
    },
    [attach(ICON.light)]: {
      color: '#657786',
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
