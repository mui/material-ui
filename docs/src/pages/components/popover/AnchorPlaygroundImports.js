import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/FormLabel': FormLabel,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/RadioGroup': RadioGroup,
  '@material-ui/core/Radio': Radio,
  'docs/src/modules/components/HighlightedCode': HighlightedCode,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/colors': { green },
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Popover': Popover,
  '@material-ui/core/Input': Input,
  '@material-ui/core/InputLabel': InputLabel,
};
