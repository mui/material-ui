import ListItem from '@mui/material-v7/ListItem';

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
<ListItem
  slots={{
    root: Container
  }}
  slotProps={{
    root: {
      id: 'test',
    }
  }}
/>;
