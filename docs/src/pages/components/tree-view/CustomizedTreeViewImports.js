import * as React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/SvgIcon': SvgIcon,
  '@material-ui/core/styles': { alpha, makeStyles, withStyles },
  '@material-ui/lab/TreeView': TreeView,
  '@material-ui/lab/TreeItem': TreeItem,
  '@material-ui/core/Collapse': Collapse,
  'react-spring/web.cjs': { useSpring, animated },
};
