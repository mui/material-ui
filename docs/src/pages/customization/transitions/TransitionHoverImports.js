import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

export default {
  react: React,
  'styled-components': { default: styled, ThemeProvider },
  '@material-ui/core/NoSsr': NoSsr,
  '@material-ui/core/styles': { createMuiTheme, MuiThemeProvider },
  '@material-ui/core/colors': { deepPurple },
  '@material-ui/core/Avatar': Avatar,
};
