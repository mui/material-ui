import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Paper': Paper,
  '@material-ui/core/InputBase': InputBase,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Menu': MenuIcon,
  '@material-ui/icons/Search': SearchIcon,
  '@material-ui/icons/Directions': DirectionsIcon,
};
