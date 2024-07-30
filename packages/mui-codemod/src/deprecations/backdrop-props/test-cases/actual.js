import Backdrop from '@mui/material/Backdrop';
import { Backdrop as MyBackdrop } from '@mui/material';

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
