export default ({ attach, ICON }) => {
  const root = {
    fontSize: 26.25,
    [attach(ICON.text)]: {
      fontSize: 15,
    },
    [attach(ICON.light)]: {
      color: 'rgb(101, 119, 134)',
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
