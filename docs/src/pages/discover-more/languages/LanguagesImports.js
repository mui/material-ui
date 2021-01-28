import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { LANGUAGES_LABEL } from 'docs/src/modules/constants';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Table': Table,
  '@material-ui/core/TableBody': TableBody,
  '@material-ui/core/TableCell': TableCell,
  '@material-ui/core/TableRow': TableRow,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Link': Link,
  'docs/src/modules/constants': { LANGUAGES_LABEL },
};
