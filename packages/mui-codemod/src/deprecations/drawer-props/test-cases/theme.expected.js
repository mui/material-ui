fn({
  MuiDrawer: {
    defaultProps: {
      slots: {
        backdrop: Backdrop
      },

      slotProps: {
        backdrop: {
          transitionDuration: 300,
        }
      }
    },
  },
});
fn({
  MuiSwipeableDrawer: {
    defaultProps: {
      slots: {
        backdrop: Backdrop
      },

      slotProps: {
        backdrop: {
          transitionDuration: 300,
        }
      }
    },
  },
});

fn({
  MuiDrawer: {
    defaultProps: {
      slotProps: {
        paper: {
          elevation: 20,
        }
      },
    },
  },
});
fn({
  MuiSwipeableDrawer: {
    defaultProps: {
      slotProps: {
        paper: {
          elevation: 20,
        }
      },
    },
  },
});

fn({
  MuiDrawer: {
    defaultProps: {
      slotProps: {
        transition: {
          direction: 'right',
        }
      },
    },
  },
});
fn({
  MuiSwipeableDrawer: {
    defaultProps: {
      slotProps: {
        transition: {
          direction: 'right',
        }
      },
    },
  },
});
