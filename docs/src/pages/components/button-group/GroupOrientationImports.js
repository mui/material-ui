import * as React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export default {
  react: React,
  '@material-ui/core/Button': Button,
  '@material-ui/core/ButtonGroup': ButtonGroup,
  '@material-ui/core/styles': { makeStyles, createStyles },
};
