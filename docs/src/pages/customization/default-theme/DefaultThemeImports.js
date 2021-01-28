import * as React from 'react';
import PropTypes from 'prop-types';
import url from 'url';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import CollapseIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import {
  makeStyles,
  createStyles,
  withStyles,
  createMuiTheme,
  lighten,
} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useTranslate } from 'docs/src/modules/utils/i18n';

export default {
  react: React,
  'prop-types': PropTypes,
  url,
  '@material-ui/icons/ExpandMore': ExpandIcon,
  '@material-ui/icons/ChevronRight': CollapseIcon,
  '@material-ui/lab/TreeView': TreeView,
  '@material-ui/lab/TreeItem': TreeItem,
  clsx,
  '@material-ui/core/styles': {
    makeStyles,
    createStyles,
    withStyles,
    createMuiTheme,
    lighten,
  },
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Switch': Switch,
  'docs/src/modules/utils/i18n': { useTranslate },
};
