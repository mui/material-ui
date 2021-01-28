import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Delete': DeleteIcon,
  '@material-ui/icons/Alarm': AlarmIcon,
  '@material-ui/icons/AddShoppingCart': AddShoppingCartIcon,
};
