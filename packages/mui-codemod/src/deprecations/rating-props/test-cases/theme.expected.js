fn({
  MuiRating: {
    defaultProps: {
      slotProps: {
        icon: {
          component: CustomContainer
        }
      },
    },
  },
});

fn({
  MuiRating: {
    defaultProps: {
      slotProps: {
        root: {},

        icon: {
          component: CustomContainer
        }
      }
    },
  },
});

fn({
  MuiRating: {
    defaultProps: {
      slotProps: {
        icon: {
          id: 'my-rating-icon',
          component: CustomContainer
        },
      }
    },
  },
});
