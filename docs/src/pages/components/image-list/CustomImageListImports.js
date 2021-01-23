import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/ImageList': ImageList,
  '@material-ui/core/ImageListItem': ImageListItem,
  '@material-ui/core/ImageListItemBar': ImageListItemBar,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/StarBorder': StarBorderIcon,
};
