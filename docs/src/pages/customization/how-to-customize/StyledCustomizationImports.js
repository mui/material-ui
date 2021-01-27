import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { alpha, experimentalStyled } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Slider': Slider,
  '@material-ui/core/styles': { alpha, experimentalStyled },
};
