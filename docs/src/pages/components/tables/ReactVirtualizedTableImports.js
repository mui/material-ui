import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

export default {
  react: React,
  'prop-types': PropTypes,
  clsx,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/TableCell': TableCell,
  '@material-ui/core/Paper': Paper,
  'react-virtualized': { AutoSizer, Column, Table },
};
