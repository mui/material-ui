import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { unstable_styleFunctionSx } from '@material-ui/system';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme } from '@material-ui/core/styles';

export default {
  react: React,
  'styled-components': { default: styled, ThemeProvider },
  '@material-ui/system': { unstable_styleFunctionSx },
  '@material-ui/core/NoSsr': NoSsr,
  '@material-ui/core/styles': { createMuiTheme },
};
