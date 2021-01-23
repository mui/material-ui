import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default {
  react: React,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Menu': Menu,
  '@material-ui/core/MenuItem': MenuItem,
  'material-ui-popup-state': { default: PopupState, bindTrigger, bindMenu },
};
