fn({
  MuiAvatarGroup: {
    defaultProps: {
      slotProps: {
        additionalAvatar: {color: "red"}
      }
    },
  },
});

fn({
  MuiAvatarGroup: {
    defaultProps: {
      slotProps: {
        additionalAvatar: {
          ...{color: "red"},
          ...{color: "blue"}
        }
      }
    },
  },
});
