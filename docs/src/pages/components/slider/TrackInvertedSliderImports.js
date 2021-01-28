import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export default {
  react: React,
  '@material-ui/core/styles': { experimentalStyled: styled },
  '@material-ui/core/Box': Box,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Slider': Slider,
};
