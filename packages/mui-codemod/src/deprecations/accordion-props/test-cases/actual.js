import Accordion from '@mui/material/Accordion';
import { Accordion as MyAccordion } from '@mui/material';

<Accordion TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
<MyAccordion TransitionComponent={CustomTransition} TransitionProps={transitionVars} />;
<Accordion
  slots={{ root: 'div' }}
  slotProps={{ root: { className: 'foo' } }}
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
<MyAccordion
  slots={outerSlots}
  slotProps={outerSlotProps}
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
