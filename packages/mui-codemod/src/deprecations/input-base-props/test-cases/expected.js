import InputBase from '@mui/material-v7/InputBase';

<InputBase
  slots={{
    input: ComponentsInput
  }}
  slotProps={{ input: componentsInputProps }}
/>;
<InputBase
  slots={{
    root: SlotsRoot,
    input: ComponentsInput
  }}
  slotProps={{
    root: slotsRootProps,
    input: componentsInputProps
  }} />;
<InputBase
  slots={{ root: SlotsRoot, input: SlotsInput }}
  slotProps={{ root: slotsRootProps, input: {
    ...componentsInputProps,
    ...slotsInputProps
  } }} />;
<InputBase
  slots={{ root: SlotsRoot, input: SlotsInput }}
  slotProps={{ input: {
    ...componentsInputProps,
    ...slotsInputProps
  }, root: {
    ...componentsRootProps,
    ...slotsRootProps
  } }} />;
