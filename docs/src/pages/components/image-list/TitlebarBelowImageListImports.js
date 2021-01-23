import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/ImageList': ImageList,
  '@material-ui/core/ImageListItem': ImageListItem,
  '@material-ui/core/ImageListItemBar': ImageListItemBar,
};
