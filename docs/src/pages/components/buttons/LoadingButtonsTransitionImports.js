import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/lab/LoadingButton': LoadingButton,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Switch': Switch,
  '@material-ui/icons/Save': SaveIcon,
  '@material-ui/icons/Send': SendIcon,
};
