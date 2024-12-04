import Modal from '@mui/material/Modal';

<Modal
  slots={{
    root: ComponentsRoot
  }}
  slotProps={{ root: componentsRootProps }}
/>;
<Modal
  slotProps={{ root: slotsRootProps }}
  slots={{
    root: ComponentsRoot
  }}
/>;
<Modal
  slots={{ root: SlotsRoot }}
  slotProps={{ root: componentsRootProps }}
/>;
<Modal
  slots={{ root: SlotsRoot }}
  slotProps={{ root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;
