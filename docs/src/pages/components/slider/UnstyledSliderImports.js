import * as React from 'react';
import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';
import SliderUnstyled from '@material-ui/unstyled/SliderUnstyled';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  '@material-ui/core/styles': { experimentalStyled: styled, alpha },
  '@material-ui/unstyled/SliderUnstyled': SliderUnstyled,
  '@material-ui/core/Box': Box,
};
