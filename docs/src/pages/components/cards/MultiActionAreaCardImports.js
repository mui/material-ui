import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Card': Card,
  '@material-ui/core/CardContent': CardContent,
  '@material-ui/core/CardMedia': CardMedia,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core': { Button, CardActionArea, CardActions },
};
