import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/DialogTitle': DialogTitle,
  '@material-ui/core/DialogContent': DialogContent,
  '@material-ui/core/DialogActions': DialogActions,
  '@material-ui/core/Dialog': Dialog,
  '@material-ui/core/RadioGroup': RadioGroup,
  '@material-ui/core/Radio': Radio,
  '@material-ui/core/FormControlLabel': FormControlLabel,
};
