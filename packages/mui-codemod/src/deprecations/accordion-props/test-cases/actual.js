<Accordion TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
<Accordion TransitionComponent={CustomTransition} TransitionProps={transitionVars} />;

// theme
fn({
  MuiAccordion: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: { unmountOnExit: true },
    },
  },
});
