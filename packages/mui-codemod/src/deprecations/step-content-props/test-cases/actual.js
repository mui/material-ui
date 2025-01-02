import StepContent from '@mui/material/StepContent';
import { StepContent as MyStepContent } from '@mui/material';

<StepContent TransitionComponent={CustomTransition} TransitionProps={{ unmountOnExit: true }} />;
<MyStepContent TransitionComponent={CustomTransition} TransitionProps={transitionVars} />;
<StepContent
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    root: 'div',
  }}
  slotProps={{
    root: { className: 'foo' },
  }}
/>;
<MyStepContent
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
  slots={{
    ...outerSlots,
  }}
  slotProps={{
    ...outerSlotProps,
  }}
/>;
<StepContent TransitionComponent={ComponentTransition} slots={{ transition: SlotTransition }} />;
<StepContent TransitionProps={{ unmountOnExit: true }} slotProps={{ transition: { id: 'test' } }} />;
// should skip non MUI components
<NonMuiStepContent
  TransitionComponent={CustomTransition}
  TransitionProps={{ unmountOnExit: true }}
/>;
