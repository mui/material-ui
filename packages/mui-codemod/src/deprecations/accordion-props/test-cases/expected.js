<Accordion slots={{
  transition: CustomTransition
}} slotProps={{
  transition: { unmountOnExit: true }
}} />;
<Accordion slots={{
  transition: CustomTransition
}} slotProps={{
  transition: transitionVars
}} />;
<Accordion
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    root: { className: 'foo' },
    transition: { unmountOnExit: true }
  }} />;
<Accordion
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
    transition: { unmountOnExit: true }
  }} />;
