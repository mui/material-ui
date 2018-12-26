export default ({ shade }) => ({
  MuiTableRow: {
    root: {
      '&.table__row--narrow': {
        height: 32,
      },
      '&.table__row--shaded': {
        backgroundColor: shade.light,
      },
    },
  },
});
