import FilledInput from '@mui/material/FilledInput';

<FilledInput
  components={{ Input: ComponentsInput }}
  componentsProps={{ input: componentsInputProps }}
/>;
<FilledInput
  slots={{ root: SlotsRoot }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps }}
  componentsProps={{ input: componentsInputProps }}
/>;
<FilledInput
  slots={{ root: SlotsRoot, input: SlotsInput }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps, input: slotsInputProps }}
  componentsProps={{ input: componentsInputProps }}
/>;
<FilledInput
  slots={{ root: SlotsRoot, input: SlotsInput }}
  components={{ Input: ComponentsInput }}
  slotProps={{ root: slotsRootProps, input: slotsInputProps }}
  componentsProps={{ input: componentsInputProps, root: componentsRootProps}}
/>;
