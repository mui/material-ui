export default ({ attach, DIVIDER }) => ({
  MuiDivider: {
    root: {
      [attach(DIVIDER.vertical)]: {
        backgroundColor: '#262626',
        width: 1,
        margin: '0 16px',
        display: 'inline-block',
        transform: 'scaleX(0.5)',
      },
    },
  },
});
