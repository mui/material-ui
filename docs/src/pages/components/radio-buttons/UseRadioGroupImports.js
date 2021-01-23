import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RadioGroup, { useRadioGroup } from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/RadioGroup': { default: RadioGroup, useRadioGroup },
  '@material-ui/core/FormControlLabel': FormControlLabel,
  '@material-ui/core/Radio': Radio,
};
