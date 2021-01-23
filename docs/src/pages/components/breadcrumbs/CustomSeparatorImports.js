import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/Breadcrumbs': Breadcrumbs,
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Link': Link,
  '@material-ui/icons/NavigateNext': NavigateNextIcon,
};
