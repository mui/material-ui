import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Slider, { sliderClasses } from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function ThemeSlider() {
  return (
    <Fade in timeout={700}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'center',
          bgcolor: '#fff',
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 1,
          px: 3,
          py: 4,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            borderColor: 'primaryDark.700',
          }),
        })}
      >
        <Slider
          getAriaLabel={() => 'Temperature'}
          getAriaValueText={valuetext}
          defaultValue={[25, 50]}
          valueLabelFormat={valuetext}
          valueLabelDisplay="on"
          marks={[
            { value: 0, label: '0ºC' },
            { value: 10 },
            { value: 20, label: '20ºC' },
            { value: 30 },
            { value: 40 },
            { value: 50, label: '50ºC' },
            { value: 60 },
            { value: 70 },
            { value: 80, label: '80ºC' },
            { value: 90 },
            { value: 100, label: '100ºC' },
          ]}
          sx={[
            {
              display: 'inline-block',
              width: '100%',
              color: 'primary.500',
              height: 6,
              margin: 0,
              pt: 2,
              pb: 2,
              [`& .${sliderClasses.rail}`]: {
                opacity: 1,
                bgcolor: 'grey.200',
              },
              [`& .${sliderClasses.track}`]: {
                border: 'none',
              },
              [`& .${sliderClasses.mark}`]: {
                color: 'transparent',
              },
              [`& .${sliderClasses.markLabel}`]: {
                color: 'grey.900',
                fontSize: '0.75rem',
                fontWeight: 600,
              },
              [`& .${sliderClasses.thumb}`]: {
                width: 12,
                height: 12,
                '&:before': {
                  boxShadow: 'none',
                },
              },
              [`& .${sliderClasses.valueLabel}`]: {
                backgroundColor: 'transparent',
                color: 'primary.600',
                fontWeight: 700,
                padding: 0,
                [`& .${sliderClasses.valueLabelOpen}`]: {
                  transform: 'none',
                  top: 'initial',
                },
              },
            },
            (theme) =>
              theme.applyDarkStyles({
                color: 'primary.400',
                [`& .${sliderClasses.rail}`]: {
                  bgcolor: 'primaryDark.600',
                },
                [`& .${sliderClasses.markLabel}`]: {
                  color: 'grey.600',
                },
                [`& .${sliderClasses.valueLabel}`]: {
                  color: 'primary.200',
                },
              }),
          ]}
        />
      </Box>
    </Fade>
  );
}
