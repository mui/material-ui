import Popper from '@mui/material-v7/Popper';

<Popper
  slots={{
    root: ComponentsRoot
  }}
  slotProps={{ root: componentsRootProps }}
/>;
<Popper
  slots={{ root: SlotsRoot }}
  slotProps={{ root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;
