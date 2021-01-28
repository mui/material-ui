import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Link': Link,
  '@material-ui/core/Container': Container,
  '../components/Typography': Typography,
  '../components/TextField': TextField,
};
