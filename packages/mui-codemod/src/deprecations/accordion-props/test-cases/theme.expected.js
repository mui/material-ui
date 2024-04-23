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

fn({
  MuiAccordion: {
    defaultProps: {
      slots: { transition: SlotTransition }
    },
  },
});

fn({
  MuiAccordion: {
    defaultProps: {
      slotProps: { transition: {
        ...{ unmountOnExit: true },
        ...{ id: 'test' }
      } }
    },
  },
});
