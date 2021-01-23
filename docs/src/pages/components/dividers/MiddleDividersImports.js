import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Chip': Chip,
  '@material-ui/core/Button': Button,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Divider': Divider,
  '@material-ui/core/Typography': Typography,
};
