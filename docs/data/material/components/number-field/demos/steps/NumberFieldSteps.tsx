import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldSteps() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField
        label="Fractional steps"
        defaultValue={1}
        step={0.25}
        helperText="Adjust by 0.25."
      />
      <NumberField
        label="Modifier steps"
        defaultValue={5}
        smallStep={0.25}
        largeStep={5}
        helperText="Hold Alt for 0.25 or Shift for 5."
      />
      <NumberField
        label="Snap to steps"
        defaultValue={1}
        min={0}
        step={2}
        snapOnStep
        helperText="Stepping snaps to a multiple of 2."
      />
      {/* @focus-end */}
    </Box>
  );
}
