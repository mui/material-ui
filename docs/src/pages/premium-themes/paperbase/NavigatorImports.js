import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

export default {
  react: React,
  'prop-types': PropTypes,
  clsx,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/Drawer': Drawer,
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemIcon': ListItemIcon,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/icons/Home': HomeIcon,
  '@material-ui/icons/People': PeopleIcon,
  '@material-ui/icons/DnsRounded': DnsRoundedIcon,
  '@material-ui/icons/PhotoSizeSelectActual': PermMediaOutlinedIcon,
  '@material-ui/icons/Public': PublicIcon,
  '@material-ui/icons/SettingsEthernet': SettingsEthernetIcon,
  '@material-ui/icons/SettingsInputComponent': SettingsInputComponentIcon,
  '@material-ui/icons/Timer': TimerIcon,
  '@material-ui/icons/Settings': SettingsIcon,
  '@material-ui/icons/PhonelinkSetup': PhonelinkSetupIcon,
};
