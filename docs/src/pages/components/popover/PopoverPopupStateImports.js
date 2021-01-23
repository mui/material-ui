import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export default {
  react: React,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Box': Box,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Popover': Popover,
  'material-ui-popup-state': { default: PopupState, bindTrigger, bindPopover },
};
