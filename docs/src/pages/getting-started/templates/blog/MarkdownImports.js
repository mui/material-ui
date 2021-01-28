import * as React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default {
  react: React,
  'markdown-to-jsx': ReactMarkdown,
  '@material-ui/core/styles': { makeStyles, createStyles },
  '@material-ui/core/Typography': Typography,
  '@material-ui/core/Link': Link,
};
