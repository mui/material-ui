import * as React from 'react';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { visuallyHidden } from '@material-ui/utils';

export default {
  react: React,
  '@material-ui/core/Link': Link,
  '@material-ui/core/Box': Box,
  '@material-ui/utils': { visuallyHidden },
};
