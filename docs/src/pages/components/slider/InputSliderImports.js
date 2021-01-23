import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import MuiInput from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';

export default {
  react: React,
  '@material-ui/core/styles': { styled },
  '@material-ui/core/Box': Box,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Slider': Slider,
  '@material-ui/core/Input': MuiInput,
  '@material-ui/icons/VolumeUp': VolumeUp,
};
