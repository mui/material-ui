import InputBase from '@mui/material/InputBase';

<InputBase
  components={{ Input: ComponentsInput }}
  componentsProps={{ input: componentsInputProps }}
/>;
<InputBase
  slots={{ root: SlotsRoot }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps }}
  componentsProps={{ input: componentsInputProps }}
/>;
<InputBase
  slots={{ root: SlotsRoot, input: SlotsInput }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps, input: slotsInputProps }}
  componentsProps={{ input: componentsInputProps }}
/>;
<InputBase
  slots={{ root: SlotsRoot, input: SlotsInput }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps, input: slotsInputProps }}
  componentsProps={{ input: componentsInputProps, root: componentsRootProps}}
/>;
