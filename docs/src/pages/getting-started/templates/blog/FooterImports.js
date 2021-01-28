import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default {
  react: React,
  'prop-types': PropTypes,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Container': Container,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Link': Link,
};
