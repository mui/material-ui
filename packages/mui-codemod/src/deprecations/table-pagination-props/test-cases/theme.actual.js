fn({
  MuiTablePagination: {
    defaultProps: {
      ActionsComponent: 'div',
      SelectProps: { native: true },
    },
  },
});

fn({
  MuiTablePagination: {
    defaultProps: {
      ActionsComponent: 'div',
      SelectProps: { native: true },
      slotProps: {
        root: { id: 'test' },
      },
      slots: {
        root: 'div',
      },
    },
  },
});
