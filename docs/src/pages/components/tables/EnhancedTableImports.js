import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { visuallyHidden } from '@material-ui/utils';

export default {
  react: React,
  'prop-types': PropTypes,
  clsx,
  '@material-ui/core/styles': { lighten, makeStyles, createStyles },
  '@material-ui/core/Table': Table,
  '@material-ui/core/TableBody': TableBody,
  '@material-ui/core/TableCell': TableCell,
  '@material-ui/core/TableContainer': TableContainer,
  '@material-ui/core/TableHead': TableHead,
  '@material-ui/core/TablePagination': TablePagination,
  '@material-ui/core/TableRow': TableRow,
  '@material-ui/core/TableSortLabel': TableSortLabel,
  '@material-ui/core/Toolbar': Toolbar,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Checkbox': Checkbox,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/Tooltip': Tooltip,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Switch': Switch,
  '@material-ui/icons/Delete': DeleteIcon,
  '@material-ui/icons/FilterList': FilterListIcon,
  '@material-ui/utils': { visuallyHidden },
};
