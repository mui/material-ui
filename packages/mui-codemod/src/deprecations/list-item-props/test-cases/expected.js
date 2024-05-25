import ListItem from '@mui/material/ListItem';

<ListItem
  slots={{
    root: ComponentsRoot
  }}
  slotProps={{ root: componentsRootProps }}
/>;
<ListItem
  slotProps={{ root: slotsRootProps }}
  slots={{
    root: ComponentsRoot
  }}
/>;
<ListItem
  slots={{ root: SlotsRoot }}
  slotProps={{ root: componentsRootProps }}
/>;
<ListItem
  slots={{ root: SlotsRoot }}
  slotProps={{ root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;
