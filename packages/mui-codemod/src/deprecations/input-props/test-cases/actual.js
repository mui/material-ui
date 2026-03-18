import Input from '@mui/material-v7/Input';

<Input
  components={{ Input: ComponentsInput }}
  componentsProps={{ input: componentsInputProps }}
/>;
<Input
  slots={{ root: SlotsRoot }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps }}
  componentsProps={{ input: componentsInputProps }}
/>;
<Input
  slots={{ root: SlotsRoot, input: SlotsInput }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps, input: slotsInputProps }}
  componentsProps={{ input: componentsInputProps }}
/>;
<Input
  slots={{ root: SlotsRoot, input: SlotsInput }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps, input: slotsInputProps }}
  componentsProps={{ input: componentsInputProps, root: componentsRootProps}}
/>;
