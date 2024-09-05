fn({
  MuiAvatarGroup: {
    defaultProps: {
      slotProps: {
        surplus: {color: "red"}
      }
    },
  },
});

fn({
  MuiAvatarGroup: {
    defaultProps: {
      slotProps: {
        surplus: {
          ...{color: "red"},
          ...{color: "blue"}
        }
      }
    },
  },
});

fn({
  MuiAvatarGroup: {
    defaultProps: {
      slotProps: {
        surplus: {
          ...{
            ...{color: "red"},
            ...{color: "blue"}
          },

          ...{color: "yellow"}
        }
      }
    },
  },
});
