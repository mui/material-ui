import ListItem from '@mui/material/ListItem';

<ListItem
  components={{ Root: ComponentsRoot }}
  componentsProps={{ root: componentsRootProps }}
/>;
<ListItem
  components={{ Root: ComponentsRoot }}
  slotProps={{ root: slotsRootProps }}
/>;
<ListItem
  slots={{ root: SlotsRoot }}
  componentsProps={{ root: componentsRootProps }}
/>;
<ListItem
  slots={{ root: SlotsRoot }}
  components={{ Root: ComponentsRoot }}
  slotProps={{ root: slotsRootProps }}
  componentsProps={{ root: componentsRootProps }}
/>;
