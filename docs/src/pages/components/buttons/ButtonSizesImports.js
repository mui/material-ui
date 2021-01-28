import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Button': Button,
  '@material-ui/core/IconButton': IconButton,
  '@material-ui/icons/Delete': DeleteIcon,
  '@material-ui/icons/ArrowDownward': ArrowDownwardIcon,
};
