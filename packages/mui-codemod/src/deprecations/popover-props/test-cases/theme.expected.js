fn({
  MuiPopover: {
    defaultProps: {
      slots: {
        backdrop: 'div',
        transition: 'em'
      },

      slotProps: {
        backdrop: { timeout: 200 },
        paper: { elevation: 8 },
        transition: { timeout: 200 }
      }
    },
  },
});
