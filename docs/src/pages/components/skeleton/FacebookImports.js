import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/core/Skeleton';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Card': Card,
  '@material-ui/core/CardHeader': CardHeader,
  '@material-ui/core/CardContent': CardContent,
  '@material-ui/core/CardMedia': CardMedia,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/MoreVert': MoreVertIcon,
  '@material-ui/core/Skeleton': Skeleton,
};
