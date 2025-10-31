---
productId: material-ui
title: React Slider component
components: Slider
githubLabel: 'scope: slider'
materialDesign: https://m2.material.io/components/sliders
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/
githubSource: packages/mui-material/src/Slider
---

# Slider

Sliders allow users to make selections from a range of values.

Sliders reflect a range of values along a bar, from which users may select a single value. They are ideal for adjusting settings such as volume, brightness, or applying image filters.

## Continuous sliders

Continuous sliders allow users to select a value along a subjective range.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

export default function ContinuousSlider() {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: Event, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <VolumeDown />
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <VolumeUp />
      </Stack>
      <Slider disabled defaultValue={30} aria-label="Disabled slider" />
    </Box>
  );
}
```

## Sizes

For smaller slider, use the prop `size="small"`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function SliderSizes() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  );
}
```

## Discrete sliders

Discrete sliders can be adjusted to a specific value by referencing its value indicator.
You can generate a mark for each step with `marks={true}`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={10}
        marks
        min={10}
        max={110}
      />
      <Slider defaultValue={30} step={10} marks min={10} max={110} disabled />
    </Box>
  );
}
```

### Small steps

You can change the default step increment.
Make sure to adjust the `shiftStep` prop (the granularity with which the slider can step when using Page Up/Down or Shift + Arrow Up/Down) to a value divisible by the `step`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSliderSteps() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Small steps"
        defaultValue={0.00000005}
        getAriaValueText={valuetext}
        step={0.00000001}
        marks
        min={-0.00000005}
        max={0.0000001}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
```

### Custom marks

You can have custom marks by providing a rich array to the `marks` prop.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSliderMarks() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
```

### Restricted values

You can restrict the selectable values to those provided with the `marks` prop with `step={null}`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSliderValues() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Restricted values"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
```

### Label always visible

You can force the thumb label to be always visible with `valueLabelDisplay="on"`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSliderLabel() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Always visible"
        defaultValue={80}
        getAriaValueText={valuetext}
        step={10}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}
```

## Range slider

The slider can be used to set the start and end of a range by supplying an array of values to the `value` prop.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
```

### Minimum distance

You can enforce a minimum distance between values in the `onChange` event handler.
By default, when you move the pointer over a thumb while dragging another thumb, the active thumb will swap to the hovered thumb. You can disable this behavior with the `disableSwap` prop.
If you want the range to shift when reaching minimum distance, you can utilize the `activeThumb` parameter in `onChange`.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

export default function MinimumDistanceSlider() {
  const [value1, setValue1] = React.useState<number[]>([20, 37]);

  const handleChange1 = (event: Event, newValue: number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState<number[]>([20, 37]);

  const handleChange2 = (event: Event, newValue: number[], activeThumb: number) => {
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
      <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
```

## Slider with input field

In this example, an input allows a discrete value to be set.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider() {
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event: Event, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid>
          <VolumeUp />
        </Grid>
        <Grid size="grow">
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
```

## Color

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function ColorSlider() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        color="secondary"
      />
    </Box>
  );
}
```

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

```tsx
import * as React from 'react';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: '#007bff',
  height: 5,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
    '&:before': {
      boxShadow:
        '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&::before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: '#000',
      ...theme.applyStyles('dark', {
        color: '#fff',
      }),
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 5,
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    boxShadow: 'inset 0px 0px 4px -2px #000',
    backgroundColor: '#d0d0d0',
  },
  ...theme.applyStyles('dark', {
    color: '#0a84ff',
  }),
}));

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
    ...theme.applyStyles('dark', {
      color: '#bfbfbf',
      opacity: undefined,
    }),
  },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

export default function CustomizedSlider() {
  return (
    <Box sx={{ width: 320 }}>
      <Typography gutterBottom>iOS</Typography>
      <IOSSlider aria-label="ios slider" defaultValue={60} valueLabelDisplay="on" />
      <Box sx={{ m: 3 }} />
      <Typography gutterBottom>pretto.fr</Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={20}
      />
      <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Tooltip value label</Typography>
      <Slider
        valueLabelDisplay="auto"
        slots={{
          valueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={20}
      />
      <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Airbnb</Typography>
      <AirbnbSlider
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[20, 40]}
      />
    </Box>
  );
}
```

### Music player

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&::before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&::after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(0,0,0,0.6)',
  }),
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider() {
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  return (
    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative', p: 3 }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CoverImage>
            <img
              alt="can't win - Chilling Sunday"
              src="/static/images/sliders/chilling-sunday.jpg"
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 500 }}
            >
              Jun Pulse
            </Typography>
            <Typography noWrap>
              <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
            </Typography>
            <Typography noWrap sx={{ letterSpacing: -0.25 }}>
              Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={(t) => ({
            color: 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                ...t.applyStyles('dark', {
                  boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                }),
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
            ...t.applyStyles('dark', {
              color: '#fff',
            }),
          })}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
            '& svg': {
              color: '#000',
              ...theme.applyStyles('dark', {
                color: '#fff',
              }),
            },
          })}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" />
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: '3rem' }} />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" />
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={(theme) => ({
            mb: 1,
            px: 1,
            '& > svg': {
              color: 'rgba(0,0,0,0.4)',
              ...theme.applyStyles('dark', {
                color: 'rgba(255,255,255,0.4)',
              }),
            },
          })}
          alignItems="center"
        >
          <VolumeDownRounded />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={(t) => ({
              color: 'rgba(0,0,0,0.87)',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&::before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
              ...t.applyStyles('dark', {
                color: '#fff',
              }),
            })}
          />
          <VolumeUpRounded />
        </Stack>
      </Widget>
      <WallPaper />
    </Box>
  );
}
```

## Vertical sliders

Set the `orientation` prop to `"vertical"` to create vertical sliders. The thumb will track vertical movement instead of horizontal movement.

```tsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function VerticalSlider() {
  return (
    <Stack sx={{ height: 300 }} spacing={1} direction="row">
      <Slider
        aria-label="Temperature"
        orientation="vertical"
        getAriaValueText={getAriaValueText}
        valueLabelDisplay="auto"
        defaultValue={30}
      />
      <Slider
        aria-label="Temperature"
        orientation="vertical"
        defaultValue={30}
        valueLabelDisplay="auto"
        disabled
      />
      <Slider
        getAriaLabel={() => 'Temperature'}
        orientation="vertical"
        getAriaValueText={getAriaValueText}
        defaultValue={[20, 37]}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Stack>
  );
}

function getAriaValueText(value: number) {
  return `${value}°C`;
}

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
```

:::warning
Chrome versions below 124 implement `aria-orientation` incorrectly for vertical sliders and expose them as `'horizontal'` in the accessibility tree. ([Chromium issue #40736841](https://issues.chromium.org/issues/40736841))

The `-webkit-appearance: slider-vertical` CSS property can be used to correct this for these older versions, with the trade-off of causing a console warning in newer Chrome versions:

```css
.MuiSlider-thumb input {
  -webkit-appearance: slider-vertical;
}
```

:::

## Marks placement

You can customize your slider by adding and repositioning marks for minimum and maximum values.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const MAX = 100;
const MIN = 0;
const marks = [
  {
    value: MIN,
    label: '',
  },
  {
    value: MAX,
    label: '',
  },
];

export default function CustomMarks() {
  const [val, setVal] = React.useState<number>(MIN);
  const handleChange = (_: Event, newValue: number) => {
    setVal(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Slider
        marks={marks}
        step={10}
        value={val}
        valueLabelDisplay="auto"
        min={MIN}
        max={MAX}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          onClick={() => setVal(MIN)}
          sx={{ cursor: 'pointer' }}
        >
          {MIN} min
        </Typography>
        <Typography
          variant="body2"
          onClick={() => setVal(MAX)}
          sx={{ cursor: 'pointer' }}
        >
          {MAX} max
        </Typography>
      </Box>
    </Box>
  );
}
```

## Track

The track shows the range available for user selection.

### Removed track

The track can be turned off with `track={false}`.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const Separator = styled('div')(
  ({ theme }) => `
  height: ${theme.spacing(3)};
`,
);

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

function valuetext(value: number) {
  return `${value}°C`;
}

export default function TrackFalseSlider() {
  return (
    <Box sx={{ width: 250 }}>
      <Typography id="track-false-slider" gutterBottom>
        Removed track
      </Typography>
      <Slider
        track={false}
        aria-labelledby="track-false-slider"
        getAriaValueText={valuetext}
        defaultValue={30}
        marks={marks}
      />
      <Separator />
      <Typography id="track-false-range-slider" gutterBottom>
        Removed track range slider
      </Typography>
      <Slider
        track={false}
        aria-labelledby="track-false-range-slider"
        getAriaValueText={valuetext}
        defaultValue={[20, 37, 50]}
        marks={marks}
      />
    </Box>
  );
}
```

### Inverted track

The track can be inverted with `track="inverted"`.

```tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const Separator = styled('div')(
  ({ theme }) => `
  height: ${theme.spacing(3)};
`,
);

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

function valuetext(value: number) {
  return `${value}°C`;
}

export default function TrackInvertedSlider() {
  return (
    <Box sx={{ width: 250 }}>
      <Typography id="track-inverted-slider" gutterBottom>
        Inverted track
      </Typography>
      <Slider
        track="inverted"
        aria-labelledby="track-inverted-slider"
        getAriaValueText={valuetext}
        defaultValue={30}
        marks={marks}
      />
      <Separator />
      <Typography id="track-inverted-range-slider" gutterBottom>
        Inverted track range
      </Typography>
      <Slider
        track="inverted"
        aria-labelledby="track-inverted-range-slider"
        getAriaValueText={valuetext}
        defaultValue={[20, 37]}
        marks={marks}
      />
    </Box>
  );
}
```

## Non-linear scale

You can use the `scale` prop to represent the `value` on a different scale.

In the following demo, the value _x_ represents the value _2^x_.
Increasing _x_ by one increases the represented value by factor _2_.

```tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

function valueLabelFormat(value: number) {
  const units = ['KB', 'MB', 'GB', 'TB'];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1024 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1024;
  }

  return `${scaledValue} ${units[unitIndex]}`;
}

function calculateValue(value: number) {
  return 2 ** value;
}

export default function NonLinearSlider() {
  const [value, setValue] = React.useState<number>(10);

  const handleChange = (event: Event, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="non-linear-slider" gutterBottom>
        Storage: {valueLabelFormat(calculateValue(value))}
      </Typography>
      <Slider
        value={value}
        min={5}
        step={1}
        max={30}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </Box>
  );
}
```

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/)

The component handles most of the work necessary to make it accessible.
However, you need to make sure that:

- Each thumb has a user-friendly label (`aria-label`, `aria-labelledby` or `getAriaLabel` prop).
- Each thumb has a user-friendly text for its current value.
  This is not required if the value matches the semantics of the label.
  You can change the name with the `getAriaValueText` or `aria-valuetext` prop.

# Slider API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [Slider](https://mui.com/material-ui/react-slider/)

## Import

```jsx
import Slider from '@mui/material/Slider';
// or
import { Slider } from '@mui/material';
```

## Props

| Name                         | Type                                                                                                                                                                                                                                                                                                                                   | Default                 | Required | Description                                                                                                                                                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aria-label                   | `string`                                                                                                                                                                                                                                                                                                                               | -                       | No       |                                                                                                                                                                                                                         |
| aria-labelledby              | `string`                                                                                                                                                                                                                                                                                                                               | -                       | No       |                                                                                                                                                                                                                         |
| aria-valuetext               | `string`                                                                                                                                                                                                                                                                                                                               | -                       | No       |                                                                                                                                                                                                                         |
| classes                      | `object`                                                                                                                                                                                                                                                                                                                               | -                       | No       | Override or extend the styles applied to the component.                                                                                                                                                                 |
| color                        | `'primary' \| 'secondary' \| 'error' \| 'info' \| 'success' \| 'warning' \| string`                                                                                                                                                                                                                                                    | `'primary'`             | No       |                                                                                                                                                                                                                         |
| components (deprecated)      | `{ Input?: elementType, Mark?: elementType, MarkLabel?: elementType, Rail?: elementType, Root?: elementType, Thumb?: elementType, Track?: elementType, ValueLabel?: elementType }`                                                                                                                                                     | `{}`                    | No       | ⚠️ use the `slots` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.     |
| componentsProps (deprecated) | `{ input?: func \| object, mark?: func \| object, markLabel?: func \| object, rail?: func \| object, root?: func \| object, thumb?: func \| object, track?: func \| object, valueLabel?: func \| { children?: element, className?: string, open?: bool, style?: object, value?: node, valueLabelDisplay?: 'auto' \| 'off' \| 'on' } }` | `{}`                    | No       | ⚠️ use the `slotProps` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details. |
| defaultValue                 | `Array<number> \| number`                                                                                                                                                                                                                                                                                                              | -                       | No       |                                                                                                                                                                                                                         |
| disabled                     | `bool`                                                                                                                                                                                                                                                                                                                                 | `false`                 | No       |                                                                                                                                                                                                                         |
| disableSwap                  | `bool`                                                                                                                                                                                                                                                                                                                                 | `false`                 | No       |                                                                                                                                                                                                                         |
| getAriaLabel                 | `function(index: number) => string`                                                                                                                                                                                                                                                                                                    | -                       | No       |                                                                                                                                                                                                                         |
| getAriaValueText             | `function(value: number, index: number) => string`                                                                                                                                                                                                                                                                                     | -                       | No       |                                                                                                                                                                                                                         |
| marks                        | `Array<{ label?: node, value: number }> \| bool`                                                                                                                                                                                                                                                                                       | `false`                 | No       |                                                                                                                                                                                                                         |
| max                          | `number`                                                                                                                                                                                                                                                                                                                               | `100`                   | No       |                                                                                                                                                                                                                         |
| min                          | `number`                                                                                                                                                                                                                                                                                                                               | `0`                     | No       |                                                                                                                                                                                                                         |
| name                         | `string`                                                                                                                                                                                                                                                                                                                               | -                       | No       |                                                                                                                                                                                                                         |
| onChange                     | `function(event: Event, value: Value, activeThumb: number) => void`                                                                                                                                                                                                                                                                    | -                       | No       |                                                                                                                                                                                                                         |
| onChangeCommitted            | `function(event: React.SyntheticEvent \| Event, value: Value) => void`                                                                                                                                                                                                                                                                 | -                       | No       |                                                                                                                                                                                                                         |
| orientation                  | `'horizontal' \| 'vertical'`                                                                                                                                                                                                                                                                                                           | `'horizontal'`          | No       |                                                                                                                                                                                                                         |
| scale                        | `function(x: any) => any`                                                                                                                                                                                                                                                                                                              | `function Identity(x) { |

return x;
}`| No |  |
| shiftStep |`number`|`10`| No |  |
| size |`'small' \| 'medium' \| string`|`'medium'`| No |  |
| slotProps |`{ input?: func \| object, mark?: func \| object, markLabel?: func \| object, rail?: func \| object, root?: func \| object, thumb?: func \| object, track?: func \| object, valueLabel?: func \| { children?: element, className?: string, open?: bool, style?: object, value?: node, valueLabelDisplay?: 'auto' \| 'off' \| 'on' } }`|`{}`| No |  |
| slots |`{ input?: elementType, mark?: elementType, markLabel?: elementType, rail?: elementType, root?: elementType, thumb?: elementType, track?: elementType, valueLabel?: elementType }`|`{}`| No |  |
| step |`number`|`1`| No |  |
| sx |`Array<func \| object \| bool> \| func \| object`| - | No | The system prop that allows defining system overrides as well as additional CSS styles. |
| tabIndex |`number`| - | No |  |
| track |`'inverted' \| 'normal' \| false`|`'normal'`| No |  |
| value |`Array<number> \| number`| - | No |  |
| valueLabelDisplay |`'auto' \| 'off' \| 'on'`|`'off'`| No |  |
| valueLabelFormat |`func \| string`|`function Identity(x) {
return x;
}` | No | |

> **Note**: The `ref` is forwarded to the root element (HTMLSpanElement).

> Any other props supplied will be provided to the root element (native element).

## Theme default props

You can use `MuiSlider` to change the default props of this component with the theme.

## CSS

### Rule name

| Global class        | Rule name           | Description                                                                        |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| `.Mui-active`       | -                   | State class applied to the thumb element if it's active.                           |
| -                   | colorError          | Styles applied to the root element if `color="error"`.                             |
| -                   | colorInfo           | Styles applied to the root element if `color="info"`.                              |
| -                   | colorPrimary        | Styles applied to the root element if `color="primary"`.                           |
| -                   | colorSecondary      | Styles applied to the root element if `color="secondary"`.                         |
| -                   | colorSuccess        | Styles applied to the root element if `color="success"`.                           |
| -                   | colorWarning        | Styles applied to the root element if `color="warning"`.                           |
| `.Mui-disabled`     | -                   | State class applied to the root and thumb element if `disabled={true}`.            |
| -                   | dragging            | State class applied to the root if a thumb is being dragged.                       |
| `.Mui-focusVisible` | -                   | State class applied to the thumb element if keyboard focused.                      |
| -                   | mark                | Styles applied to the mark element.                                                |
| -                   | markActive          | Styles applied to the mark element if active (depending on the value).             |
| -                   | marked              | Styles applied to the root element if `marks` is provided with at least one label. |
| -                   | markLabel           | Styles applied to the mark label element.                                          |
| -                   | markLabelActive     | Styles applied to the mark label element if active (depending on the value).       |
| -                   | rail                | Styles applied to the rail element.                                                |
| -                   | root                | Styles applied to the root element.                                                |
| -                   | sizeSmall           | Styles applied to the root element if `size="small"`.                              |
| -                   | thumb               | Styles applied to the thumb element.                                               |
| -                   | thumbColorError     | Styles applied to the thumb element if `color="error"`.                            |
| -                   | thumbColorInfo      | Styles applied to the thumb element if `color="info"`.                             |
| -                   | thumbColorPrimary   | Styles applied to the thumb element if `color="primary"`.                          |
| -                   | thumbColorSecondary | Styles applied to the thumb element if `color="secondary"`.                        |
| -                   | thumbColorSuccess   | Styles applied to the thumb element if `color="success"`.                          |
| -                   | thumbColorWarning   | Styles applied to the thumb element if `color="warning"`.                          |
| -                   | thumbSizeSmall      | Styles applied to the thumb element if `size="small"`.                             |
| -                   | track               | Styles applied to the track element.                                               |
| -                   | trackFalse          | Styles applied to the root element if `track={false}`.                             |
| -                   | trackInverted       | Styles applied to the root element if `track="inverted"`.                          |
| -                   | valueLabel          | Styles applied to the thumb label element.                                         |
| -                   | valueLabelCircle    | Styles applied to the thumb label's circle element.                                |
| -                   | valueLabelLabel     | Styles applied to the thumb label's label element.                                 |
| -                   | valueLabelOpen      | Styles applied to the thumb label element if it's open.                            |
| -                   | vertical            | Styles applied to the root element if `orientation="vertical"`.                    |

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/Slider/Slider.js](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/Slider/Slider.js)
