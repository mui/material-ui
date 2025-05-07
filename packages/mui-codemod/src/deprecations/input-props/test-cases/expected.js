import Input from '@mui/material/Input';

<Input
  slots={{
    input: ComponentsInput
  }}
  slotProps={{ input: componentsInputProps }}
/>;
<Input
  slots={{
    root: SlotsRoot,
    input: ComponentsInput
  }}
  slotProps={{
    root: slotsRootProps,
    input: componentsInputProps
  }} />;
<Input
  slots={{ root: SlotsRoot, input: SlotsInput }}
  slotProps={{ root: slotsRootProps, input: {
    ...componentsInputProps,
    ...slotsInputProps
  } }} />;
<Input
  slots={{ root: SlotsRoot, input: SlotsInput }}
  slotProps={{ input: {
    ...componentsInputProps,
    ...slotsInputProps
  }, root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;
