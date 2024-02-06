import Accordion from '@mui/material/Accordion';
import { Accordion as MyAccordion } from '@mui/material';

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
// should skip non MUI components
<NonMuiAccordion
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
