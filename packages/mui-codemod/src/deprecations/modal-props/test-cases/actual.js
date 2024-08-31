import Modal from '@mui/material/Modal';

<Modal
  components={{ Root: ComponentsRoot }}
  componentsProps={{ root: componentsRootProps }}
/>;
<Modal
  components={{ Root: ComponentsRoot }}
  slotProps={{ root: slotsRootProps }}
/>;
<Modal
  slots={{ root: SlotsRoot }}
  componentsProps={{ root: componentsRootProps }}
/>;
<Modal
  slots={{ root: SlotsRoot }}
  components={{ Root: ComponentsRoot }}
  slotProps={{ root: slotsRootProps }}
  componentsProps={{ root: componentsRootProps }}
/>;
