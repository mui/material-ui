import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import appList from './appList';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/InputLabel': InputLabel,
  '@material-ui/core/MenuItem': MenuItem,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/Select': Select,
  '@material-ui/core/Card': Card,
  '@material-ui/core/CardMedia': CardMedia,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/GitHub': GitHubIcon,
  'docs/src/modules/components/Link': Link,
  'docs/src/modules/utils/i18n': { useTranslate },
  './appList': appList,
};
