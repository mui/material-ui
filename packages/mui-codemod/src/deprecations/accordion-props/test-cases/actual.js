<Accordion TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
<Accordion TransitionComponent={CustomTransition} TransitionProps={transitionVars} />;
<Accordion
  slots={{ root: 'div' }}
  slotProps={{ root: { className: 'foo' } }}
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
<Accordion
  slots={outerSlots}
  slotProps={outerSlotProps}
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
