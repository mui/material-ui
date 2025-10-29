import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valueText(value) {
  return `${value}°C`;
}

export default function AlwaysVisibleLabelSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={80}
        getAriaValueText={valueText}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}
