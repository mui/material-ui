import Backdrop from '@org/ui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@org/ui/material';

<Backdrop TransitionComponent={CustomTransition} />;
<MyBackdrop TransitionComponent={CustomTransition} />;
<Backdrop
  TransitionComponent={CustomTransition}
  slots={{
    root: 'div',
  }}
/>;
<MyBackdrop
  TransitionComponent={CustomTransition}
  slots={{
    ...outerSlots,
  }}
/>;
<Backdrop
  TransitionComponent={ComponentTransition}
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
/>;

// should skip non MUI components
<NonMuiBackdrop TransitionComponent={CustomTransition} />;

<Backdrop components={{ Root: ComponentsRoot }} componentsProps={{ root: componentsRootProps }} />;
<MyBackdrop components={{ Root: ComponentsRoot }} slotProps={{ root: slotsRootProps }} />;
<Backdrop slots={{ root: SlotsRoot }} componentsProps={{ root: componentsRootProps }} />;
<MyBackdrop
  slots={{ root: SlotsRoot }}
  components={{ Root: ComponentsRoot }}
  slotProps={{ root: slotsRootProps }}
  componentsProps={{ root: componentsRootProps }}
/>;

// should skip non MUI components
<NonMuiBackdrop components={{ Root: ComponentsRoot }} />;
