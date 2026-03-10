fn({
  MuiTabs: {
    defaultProps: {
      slots: {
        scrollButtons: CustomScrollButton
      },

      slotProps: {
        scrollButtons: { disableRipple: true },
        indicator: { className: 'indicator' }
      }
    },
  },
});
