import createTheme from '../styles/createTheme';

createTheme({
  components: {
    MuiSwipeableDrawer: {
      defaultProps: {
        disableSwipeToOpen: true,
      },
    },
  },
});
