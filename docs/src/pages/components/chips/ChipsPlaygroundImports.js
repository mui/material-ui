import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { withStyles },
  'docs/src/modules/components/HighlightedCode': HighlightedCode,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/FormControl': FormControl,
  '@material-ui/core/FormLabel': FormLabel,
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/RadioGroup': RadioGroup,
  '@material-ui/core/Radio': Radio,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/Chip': Chip,
  '@material-ui/icons/Face': FaceIcon,
  '@material-ui/icons/Done': DoneIcon,
};
