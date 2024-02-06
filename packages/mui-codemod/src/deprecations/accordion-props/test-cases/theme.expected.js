fn({
  MuiAccordion: {
    defaultProps: {
      slots: {
        transition: CustomTransition
      },

      slotProps: {
        transition: { unmountOnExit: true }
      }
    },
  },
});
