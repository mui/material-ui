import * as React from 'react';
import { expectType } from '@mui/types';
import Slider, { SliderOwnerState } from '@mui/joy/Slider';

<Slider />;

<Slider component="div" />;

<Slider data-testid="any" />;

// common HTML attributes
<Slider onDrop={() => {}} />;

<Slider defaultValue={30} />;

<Slider color="primary" />;
<Slider color="danger" />;
<Slider color="success" />;
<Slider color="warning" />;
<Slider color="neutral" />;

<Slider size="sm" />;
<Slider size="md" />;
<Slider size="lg" />;

<Slider
  sx={{
    '--joy-Slider-trackRadius': '8px',
    '--joy-Slider-trackWidth': '48px',
    '--joy-Slider-trackHeight': '24px',
    '--joy-Slider-thumbSize': '16px',
  }}
/>;

<Slider
  slots={{
    root: 'div',
    mark: 'div',
    markLabel: 'div',
    rail: 'div',
    track: 'div',
    thumb: 'div',
    valueLabel: 'div',
    input: 'div',
  }}
/>;

<Slider
  slotProps={{
    root: {
      component: 'div',
      'data-testid': 'test',
    },
    mark: {
      component: 'div',
      'data-testid': 'test',
    },
    markLabel: {
      component: 'div',
      'data-testid': 'test',
    },
    rail: {
      component: 'div',
      'data-testid': 'test',
    },
    track: {
      component: 'div',
      'data-testid': 'test',
    },
    thumb: {
      component: 'div',
      'data-testid': 'test',
    },
    valueLabel: {
      component: 'div',
      'data-testid': 'test',
    },
    input: {
      component: 'div',
      'data-testid': 'test',
    },
  }}
/>;

<Slider
  slotProps={{
    root: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    mark: (ownerState) => {
      expectType<SliderOwnerState & { percent?: number }, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    markLabel: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    rail: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    track: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    thumb: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    valueLabel: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
    input: (ownerState) => {
      expectType<SliderOwnerState, typeof ownerState>(ownerState);
      return {
        'data-testid': 'test',
      };
    },
  }}
/>;
