export default ({ attach, GRID }) => ({
  MuiGrid: {
    item: {
      [attach(GRID.flex)]: {
        display: 'flex',
      },
    },
  },
});
