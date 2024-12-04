import OutlinedInput from '@mui/material/OutlinedInput';

<OutlinedInput
  slots={{
    input: ComponentsInput
  }}
  slotProps={{ input: componentsInputProps }}
/>;
<OutlinedInput
  slots={{
    root: SlotsRoot,
    input: ComponentsInput
  }}
  slotProps={{
    root: slotsRootProps,
    input: componentsInputProps
  }} />;
<OutlinedInput
  slots={{ root: SlotsRoot, input: SlotsInput }}
  slotProps={{ root: slotsRootProps, input: {
    ...componentsInputProps,
    ...slotsInputProps
  } }} />;
<OutlinedInput
  slots={{ root: SlotsRoot, input: SlotsInput }}
  slotProps={{ input: {
    ...componentsInputProps,
    ...slotsInputProps
  }, root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;
