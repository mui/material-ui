import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldScrubAreaOptions() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField
        label="Horizontal dragging"
        defaultValue={5}
        scrubArea="start"
        helperText="Drag left or right."
      />
      <NumberField
        label="Vertical dragging"
        defaultValue={5}
        scrubArea="start"
        helperText="Move at least 8 pixels to change the value."
        slotProps={{ scrubArea: { direction: 'vertical', pixelSensitivity: 8 } }}
      />
      {/* @focus-end */}
    </Box>
  );
}
