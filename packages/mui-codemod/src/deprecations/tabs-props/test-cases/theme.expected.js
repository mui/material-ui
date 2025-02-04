fn({
  MuiTabs: {
    defaultProps: {
      slots: {
        scrollButton: CustomScrollButton
      },

      slotProps: {
        scrollButton: { disableRipple: true },
        indicator: { className: 'indicator' }
      }
    },
  },
});
