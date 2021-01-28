import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/List': List,
  '@material-ui/core/ListItem': ListItem,
  '@material-ui/core/ListItemAvatar': ListItemAvatar,
  '@material-ui/core/ListItemText': ListItemText,
  '@material-ui/core/DialogTitle': DialogTitle,
  '@material-ui/core/Dialog': Dialog,
  '@material-ui/icons/Person': PersonIcon,
  '@material-ui/icons/Add': AddIcon,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/colors': { blue },
};
