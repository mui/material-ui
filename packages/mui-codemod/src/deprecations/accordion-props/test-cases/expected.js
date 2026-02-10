import Accordion from '@mui/material/Accordion';
import { Accordion as MyAccordion } from '@mui/material';

<Accordion slots={{
  transition: CustomTransition
}} slotProps={{
  transition: { unmountOnExit: true }
}} />;
<MyAccordion slots={{
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
<MyAccordion
  slots={{
    ...outerSlots,
    transition: CustomTransition
  }}
  slotProps={{
    ...outerSlotProps,
    transition: { unmountOnExit: true }
  }} />;
// should skip non MUI components
<NonMuiAccordion
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
