import * as React from 'react';
import useAutocomplete from '@material-ui/core/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import { useTheme, createMuiTheme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled, { ThemeProvider } from 'styled-components';

export default {
  react: React,
  '@material-ui/core/useAutocomplete': useAutocomplete,
  '@material-ui/core/NoSsr': NoSsr,
  '@material-ui/core/styles': { useTheme, createMuiTheme },
  '@material-ui/icons/Check': CheckIcon,
  '@material-ui/icons/Close': CloseIcon,
  'styled-components': { default: styled, ThemeProvider },
};
