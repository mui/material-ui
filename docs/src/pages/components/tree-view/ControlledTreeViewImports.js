import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/icons/ExpandMore': ExpandMoreIcon,
  '@material-ui/icons/ChevronRight': ChevronRightIcon,
  '@material-ui/lab/TreeView': TreeView,
  '@material-ui/lab/TreeItem': TreeItem,
};
