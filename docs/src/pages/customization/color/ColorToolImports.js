import * as React from 'react';
import PropTypes from 'prop-types';
import { rgbToHex, withStyles, useTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Slider from '@material-ui/core/Slider';
import { capitalize } from '@material-ui/core/utils';
import { DispatchContext } from 'docs/src/modules/components/ThemeContext';
import ColorDemo from './ColorDemo';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { rgbToHex, withStyles, useTheme },
  '@material-ui/core/colors': colors,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Input': Input,
  '@material-ui/core/Radio': Radio,
  '@material-ui/core/Tooltip': Tooltip,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Button': Button,
  '@material-ui/icons/Check': CheckIcon,
  '@material-ui/core/Slider': Slider,
  '@material-ui/core/utils': { capitalize },
  'docs/src/modules/components/ThemeContext': { DispatchContext },
  './ColorDemo': ColorDemo,
};
