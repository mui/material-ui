fn({
  MuiAvatarGroup: {
    defaultProps: {
      componentsProps: {
        additionalAvatar: {color: "red"}
      },
    },
  },
});

fn({
  MuiAvatarGroup: {
    defaultProps: {
      componentsProps: {
        additionalAvatar: {color: "red"}
      },
      slotProps: {
        additionalAvatar: {color: "blue"}
      }
    },
  },
});
