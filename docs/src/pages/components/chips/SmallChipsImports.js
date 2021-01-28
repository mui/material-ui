import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/Chip': Chip,
  '@material-ui/icons/Face': FaceIcon,
  '@material-ui/icons/Done': DoneIcon,
};
