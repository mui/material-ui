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
          p: 2,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.800',
            borderColor: 'primaryDark.500',
          }),
        })}
      >
        <Box
          sx={{
            display: 'inline-block',
            height: 180,
            padding: '0.75rem 0',
            borderRadius: 4,
          }}
        >
          <Slider
            getAriaLabel={() => 'Temperature'}
            orientation="vertical"
            getAriaValueText={valuetext}
            defaultValue={[25, 50]}
            marks={[{ value: 0 }, { value: 25 }, { value: 50 }, { value: 75 }, { value: 100 }]}
            valueLabelFormat={valuetext}
            valueLabelDisplay="on"
            sx={[
              {
                color: 'primary.500',
                [`& .${sliderClasses.rail}`]: {
                  opacity: 1,
                  bgcolor: 'grey.200',
                },
                [`& .${sliderClasses.track}`]: {
                  border: 'none',
                },
                [`& .${sliderClasses.mark}`]: {
                  color: 'grey.500',
                },
                [`& .${sliderClasses.thumb}`]: {
                  width: 8,
                  height: 8,
                  '&:before': {
                    boxShadow: 'none',
                  },
                },
                [`&.${sliderClasses.vertical}`]: {
                  [`& .${sliderClasses.mark}[data-index="0"]`]: {
                    bottom: '2px !important',
                    bgcolor: 'grey.500',
                  },
                  [`& .${sliderClasses.mark}[data-index="4"]`]: {
                    bottom: 'unset !important',
                    bgcolor: 'grey.500',
                  },
                  [`& .${sliderClasses.valueLabel}`]: {
                    backgroundColor: 'transparent',
                    color: 'grey.500',
                    fontWeight: 700,
                    padding: 0,
                    left: '2rem',
                    top: '14px',
                    [`& .${sliderClasses.valueLabelOpen}`]: {
                      transform: 'none',
                      top: 'initial',
                    },
                  },
                },
              },
              (theme) =>
                theme.applyDarkStyles({
                  [`& .${sliderClasses.rail}`]: {
                    bgcolor: 'primaryDark.600',
                  },
                  [`&.${sliderClasses.vertical}`]: {
                    [`& .${sliderClasses.mark}[data-index="0"]`]: {
                      bgcolor: 'primary.400',
                    },
                    [`& .${sliderClasses.mark}[data-index="4"]`]: {
                      bgcolor: 'primary.400',
                    },
                    [`& .${sliderClasses.valueLabel}`]: {
                      color: 'grey.50',
                    },
                  },
                }),
            ]}
          />
        </Box>
      </Box>
    </Fade>
  );
}
