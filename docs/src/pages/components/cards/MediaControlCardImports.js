import * as React from 'react';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles, useTheme },
  '@material-ui/core/Card': Card,
  '@material-ui/core/CardContent': CardContent,
  '@material-ui/core/CardMedia': CardMedia,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/Typography': Typography,
  '@material-ui/icons/SkipPrevious': SkipPreviousIcon,
  '@material-ui/icons/PlayArrow': PlayArrowIcon,
  '@material-ui/icons/SkipNext': SkipNextIcon,
};
