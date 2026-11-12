import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldScrubAreaPlacement() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField label="Start handle" defaultValue={5} scrubAreaPosition="start" />
      <NumberField
        label="End handle"
        defaultValue={5}
        scrubAreaPosition="end"
        controlsPosition="stacked"
      />
      {/* @focus-end */}
    </Box>
  );
}
