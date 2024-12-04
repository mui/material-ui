fn({
  MuiAvatar: {
    defaultProps: {
      imgProps: {
        onError: () => {},
        onLoad: () => {},
      },
    },
  },
});

fn({
  MuiAvatar: {
    defaultProps: {
      imgProps: {
        onLoad: () => {},
      },
      slotProps: {
        img: {
          onError: () => {},
        },
      },
    },
  },
});
