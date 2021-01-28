import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles, useTheme },
  '@material-ui/core/Table': Table,
  '@material-ui/core/TableBody': TableBody,
  '@material-ui/core/TableCell': TableCell,
  '@material-ui/core/TableContainer': TableContainer,
  '@material-ui/core/TableFooter': TableFooter,
  '@material-ui/core/TablePagination': TablePagination,
  '@material-ui/core/TableRow': TableRow,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/FirstPage': FirstPageIcon,
  '@material-ui/icons/KeyboardArrowLeft': KeyboardArrowLeft,
  '@material-ui/icons/KeyboardArrowRight': KeyboardArrowRight,
  '@material-ui/icons/LastPage': LastPageIcon,
};
