import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Popper': Popper,
  'material-ui-popup-state': { default: PopupState, bindToggle, bindPopper },
  '@material-ui/core/Fade': Fade,
  '@material-ui/core/Paper': Paper,
};
