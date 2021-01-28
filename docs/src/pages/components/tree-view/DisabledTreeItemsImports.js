import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/lab/TreeView': TreeView,
  '@material-ui/icons/ExpandMore': ExpandMoreIcon,
  '@material-ui/icons/ChevronRight': ChevronRightIcon,
  '@material-ui/lab/TreeItem': TreeItem,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Switch': Switch,
};
