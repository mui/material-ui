import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/colors': { green, pink },
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/icons/Folder': FolderIcon,
  '@material-ui/icons/Pageview': PageviewIcon,
  '@material-ui/icons/Assignment': AssignmentIcon,
};
