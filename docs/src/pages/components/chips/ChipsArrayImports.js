import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Chip': Chip,
  '@material-ui/core/Paper': Paper,
  '@material-ui/icons/TagFaces': TagFacesIcon,
};
