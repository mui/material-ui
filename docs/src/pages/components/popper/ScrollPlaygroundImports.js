import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/FormControlLabel': FormControlLabel,
  'docs/src/modules/components/HighlightedCode': HighlightedCode,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Popper': Popper,
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/DialogActions': DialogActions,
  '@material-ui/core/DialogContent': DialogContent,
  '@material-ui/core/DialogContentText': DialogContentText,
  '@material-ui/core/DialogTitle': DialogTitle,
  '@material-ui/core/Switch': Switch,
  '@material-ui/core/TextField': TextField,
  '@material-ui/core/FormGroup': FormGroup,
};
