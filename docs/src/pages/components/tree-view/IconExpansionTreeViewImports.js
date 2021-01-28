import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem, { useTreeItem } from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/lab/TreeView': TreeView,
  '@material-ui/icons/ExpandMore': ExpandMoreIcon,
  '@material-ui/icons/ChevronRight': ChevronRightIcon,
  '@material-ui/lab/TreeItem': { default: TreeItem, useTreeItem },
  clsx,
  '@material-ui/core/Typography': Typography,
};
