import * as React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Autocomplete from '@material-ui/core/Autocomplete';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as locales from '@material-ui/core/locale';

export default {
  react: React,
  '@material-ui/core/TablePagination': TablePagination,
  '@material-ui/core/Autocomplete': Autocomplete,
  '@material-ui/core/Box': Box,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/styles': { createMuiTheme, ThemeProvider },
  '@material-ui/core/locale': locales,
};
