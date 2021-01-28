import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import copy from 'clipboard-copy';
import clsx from 'clsx';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import FlexSearch from 'flexsearch';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import * as mui from '@material-ui/icons';
import synonyms from './synonyms';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Paper': Paper,
  'clipboard-copy': copy,
  clsx,
  '@material-ui/core/InputBase': InputBase,
  '@material-ui/core/Typography': Typography,
  'prop-types': PropTypes,
  'lodash/debounce': debounce,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Dialog': Dialog,
  'docs/src/modules/components/HighlightedCode': HighlightedCode,
  '@material-ui/core/DialogActions': DialogActions,
  '@material-ui/core/DialogContent': DialogContent,
  '@material-ui/core/DialogTitle': DialogTitle,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/Tooltip': Tooltip,
  '@material-ui/core/Button': Button,
  flexsearch: FlexSearch,
  '@material-ui/icons/Search': SearchIcon,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/RadioGroup': RadioGroup,
  '@material-ui/core/Radio': Radio,
  'docs/src/modules/components/Link': Link,
  'docs/src/modules/utils/i18n': { useTranslate },
  '@material-ui/icons': mui,
  './synonyms': synonyms,
};
