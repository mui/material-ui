import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  clsx,
  '@material-ui/core/Card': Card,
  '@material-ui/core/CardHeader': CardHeader,
  '@material-ui/core/CardMedia': CardMedia,
  '@material-ui/core/CardContent': CardContent,
  '@material-ui/core/CardActions': CardActions,
  '@material-ui/core/Collapse': Collapse,
  '@material-ui/core/Avatar': Avatar,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/colors': { red },
  '@material-ui/icons/Favorite': FavoriteIcon,
  '@material-ui/icons/Share': ShareIcon,
  '@material-ui/icons/ExpandMore': ExpandMoreIcon,
  '@material-ui/icons/MoreVert': MoreVertIcon,
};
