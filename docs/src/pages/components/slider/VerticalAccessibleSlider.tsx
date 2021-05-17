import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default function VerticalSlider() {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  return (
    <React.Fragment>
      <Typography id="vertical-accessible-slider" gutterBottom>
        Temperature
      </Typography>
      <Box sx={{ height: 300 }}>
        <Slider
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: 'slider-vertical',
            },
          }}
          orientation="vertical"
          defaultValue={30}
          aria-labelledby="vertical-accessible-slider"
          onKeyDown={preventHorizontalKeyboardNavigation}
        />
      </Box>
    </React.Fragment>
  );
}
