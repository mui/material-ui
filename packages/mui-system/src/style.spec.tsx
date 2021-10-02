import { styled } from '@mui/material/styles';
import { compose, createTheme, display, flexbox, style } from '@mui/system';
import * as React from 'react';

const gap = style({
  prop: 'gap',
  themeKey: 'spacing',
});

// Example 1
const CustomComponentWithNoTheme = styled('div')(compose(display, flexbox, gap({ gap: 5 })));
const Example1 = <CustomComponentWithNoTheme />;

const theme = createTheme();
// Example 2
const CustomComponentWithTheme = styled('div')(
  compose(
    display,
    flexbox,
    gap({
      theme,
      gap: 5,
    }),
  ),
);
const Example2 = <CustomComponentWithTheme />;
