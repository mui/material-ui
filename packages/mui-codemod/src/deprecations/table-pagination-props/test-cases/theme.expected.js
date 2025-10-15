fn({
  MuiTablePagination: {
    defaultProps: {
      slots: {
        actions: 'div'
      },

      slotProps: {
        select: { native: true }
      }
    },
  },
});

fn({
  MuiTablePagination: {
    defaultProps: {
      slotProps: {
        root: { id: 'test' },
        select: { native: true }
      },

      slots: {
        root: 'div',
        actions: 'div'
      }
    },
  },
});
