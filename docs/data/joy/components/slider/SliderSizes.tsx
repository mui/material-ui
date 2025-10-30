import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';

function valueText(value: number) {
  return `${value}°C`;
}

export default function SliderSizes() {
  return (
    <Box sx={{ width: 300, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Slider
        size="sm"
        aria-labelledby="color-primary-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
      <Slider
        aria-labelledby="color-neutral-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
      <Slider
        size="lg"
        aria-labelledby="color-danger-slider"
        getAriaValueText={valueText}
        defaultValue={37}
      />
    </Box>
  );
}
