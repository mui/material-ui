import FilledInput from '@mui/material/FilledInput';

<FilledInput
  slots={{
    input: ComponentsInput
  }}
  slotProps={{ input: componentsInputProps }}
/>;
<FilledInput
  slots={{
    root: SlotsRoot,
    input: ComponentsInput
  }}
  slotProps={{
    root: slotsRootProps,
    input: componentsInputProps
  }} />;
<FilledInput
  slots={{ root: SlotsRoot, input: SlotsInput }}
  slotProps={{ root: slotsRootProps, input: {
    ...componentsInputProps,
    ...slotsInputProps
  } }} />;
<FilledInput
  slots={{ root: SlotsRoot, input: SlotsInput }}
  slotProps={{ input: {
    ...componentsInputProps,
    ...slotsInputProps
  }, root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;
