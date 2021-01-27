import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  '@material-ui/core/styles': { styled },
  '@material-ui/core/Slider': Slider,
  '@material-ui/core/Box': Box,
};
