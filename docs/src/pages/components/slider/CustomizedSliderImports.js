import * as React from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@material-ui/core/Slider';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/Slider': { default: Slider, SliderThumb },
  '@material-ui/core/styles': { styled },
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Tooltip': Tooltip,
};
