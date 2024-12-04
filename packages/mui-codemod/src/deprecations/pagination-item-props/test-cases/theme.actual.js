fn({
  MuiPaginationItem: {
    defaultProps: {
      components: {
        first: componentFirst,
        last: componentLast,
        next: componentNext,
        previous: componentPrevious,
      },
    },
  },
});

fn({
  MuiPaginationItem: {
    defaultProps: {
      components: {
        first: componentFirst,
        last: componentLast,
      },
      slots: {
        next: slotNext,
        previous: slotPrevious,
      },
    },
  },
});
