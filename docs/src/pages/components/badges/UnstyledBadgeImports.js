import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import BadgeUnstyled from '@material-ui/unstyled/BadgeUnstyled';
import Box from '@material-ui/core/Box';

export default {
  react: React,
  '@material-ui/core/styles': { styled },
  '@material-ui/unstyled/BadgeUnstyled': BadgeUnstyled,
  '@material-ui/core/Box': Box,
};
