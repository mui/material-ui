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
      slotProps: {
        root: {},
      },
    },
  },
});

fn({
  MuiRating: {
    defaultProps: {
      IconContainerComponent: CustomContainer,
      slotProps: {
        icon: {
          id: 'my-rating-icon',
        },
      },
    },
  },
});
