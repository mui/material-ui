import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';
import PageContext from 'docs/src/modules/components/PageContext';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Table': Table,
  '@material-ui/core/TableBody': TableBody,
  '@material-ui/core/TableCell': TableCell,
  '@material-ui/core/TableRow': TableRow,
  '@material-ui/core/Typography': Typography,
  'docs/src/modules/components/Link': Link,
  'docs/src/modules/components/PageContext': PageContext,
};
