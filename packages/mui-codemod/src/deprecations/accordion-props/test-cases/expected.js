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
<Accordion slots={{ root: 'div' }} slotProps={{ root: { className: 'foo' } }} />;
<MyAccordion slots={outerSlots} slotProps={outerSlotProps} />;
