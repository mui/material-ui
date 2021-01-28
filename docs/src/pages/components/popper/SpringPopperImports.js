import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import { useSpring, animated } from 'react-spring/web.cjs';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Popper': Popper,
  'react-spring/web.cjs': { useSpring, animated },
};
