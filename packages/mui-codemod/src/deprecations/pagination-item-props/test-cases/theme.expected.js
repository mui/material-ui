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
        first: slotFirst,
        last: slotLast,
        next: slotNext,
        previous: slotPrevious
      }
    },
  },
});
