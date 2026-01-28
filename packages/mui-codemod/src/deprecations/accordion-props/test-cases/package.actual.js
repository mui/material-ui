import Accordion from '@org/ui/material/Accordion';
import { Accordion as MyAccordion } from '@org/ui/material';

<Accordion TransitionProps={{ unmountOnExit: true }} slots={{
  transition: CustomTransition
}} />;
<MyAccordion TransitionProps={transitionVars} slots={{
  transition: CustomTransition
}} />;
<Accordion
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    root: 'div',
    transition: CustomTransition
  }}
  slotProps={{
    root: { className: 'foo' },
  }} />;
<MyAccordion
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
  }} />;
<Accordion slots={{ transition: SlotTransition }} />;
<Accordion TransitionProps={{ unmountOnExit: true }} slotProps={{ transition: { id: 'test' } }} />;
// should skip non MUI components
<NonMuiAccordion
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
