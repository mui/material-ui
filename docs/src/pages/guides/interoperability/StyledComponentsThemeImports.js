import * as React from 'react';
import {
  createMuiTheme,
  experimentalStyled as styled,
  ThemeProvider,
  darken,
} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  '@material-ui/core/styles': {
    createMuiTheme,
    experimentalStyled: styled,
    ThemeProvider,
    darken,
  },
  '@material-ui/core/Slider': Slider,
  '@material-ui/core/Box': Box,
};
