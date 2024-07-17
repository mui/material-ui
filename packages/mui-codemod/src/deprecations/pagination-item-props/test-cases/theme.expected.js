fn({
  MuiPaginationItem: {
    defaultProps: {
      slots: {
        first: componentFirst,
        last: componentLast,
        next: componentNext,
        previous: componentPrevious
      }
    },
  },
});

fn({
  MuiPaginationItem: {
    defaultProps: {
      slots: {
        first: componentFirst,
        last: componentLast,
        next: slotNext,
        previous: slotPrevious
      }
    },
  },
});
