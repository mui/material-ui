import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';

export default {
  react: React,
  '@material-ui/core/styles': { createMuiTheme },
  '@emotion/styled': styled,
  '@emotion/react': { ThemeProvider },
};
