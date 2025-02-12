fn({
  MuiRating: {
    defaultProps: {
      IconContainerComponent: CustomContainer,
    },
  },
});

fn({
  MuiRating: {
    defaultProps: {
      IconContainerComponent: CustomContainer,
      slots: {
        root: 'div',
      },
    },
  },
});

fn({
  MuiRating: {
    defaultProps: {
      IconContainerComponent: CustomContainer,
      slots: {
        root: 'div',
        iconContainer: SlotContainer
      },
    },
  },
});


