import Accordion from '@mui/material-v7/Accordion';
import { Accordion as MyAccordion } from '@mui/material-v7';

<Accordion TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
<MyAccordion TransitionComponent={CustomTransition} TransitionProps={transitionVars} />;
<Accordion
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    root: 'div',
  }}
  slotProps={{
    root: { className: 'foo' },
  }}
/>;
<MyAccordion
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    ...outerSlots,
  }}
  slotProps={{
    ...outerSlotProps,
  }}
/>;
<Accordion TransitionComponent={ComponentTransition} slots={{ transition: SlotTransition }} />;
<Accordion TransitionProps={{ unmountOnExit: true }} slotProps={{ transition: { id: 'test' } }} />;
// should skip non MUI components
<NonMuiAccordion
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
