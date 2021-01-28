import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/ImageList': ImageList,
  '@material-ui/core/ImageListItem': ImageListItem,
};
