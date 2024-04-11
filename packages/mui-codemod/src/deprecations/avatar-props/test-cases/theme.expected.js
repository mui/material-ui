fn({
  MuiAvatar: {
    defaultProps: {
      slotProps: {
        img: {
          onError: () => {},
          onLoad: () => {},
        }
      },
    },
  },
});

fn({
  MuiAvatar: {
    defaultProps: {
      slotProps: {
        img: {
          ...{
            onLoad: () => {},
          },

          ...{
            onError: () => {},
          }
        },
      }
    },
  },
});
