import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/core/Rating';
import Box from '@material-ui/core/Box';
import StarIcon from '@material-ui/icons/Star';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Rating': Rating,
  '@material-ui/core/Box': Box,
  '@material-ui/icons/Star': StarIcon,
};
