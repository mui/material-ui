import * as React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Markdown from './modules/components/Markdown';
import Typography from './modules/components/Typography';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import withRoot from './modules/withRoot';
import terms from './modules/views/terms.md';

export default {
  react: React,
  '@material-ui/core/Container': Container,
  '@material-ui/core/Box': Box,
  './modules/components/Markdown': Markdown,
  './modules/components/Typography': Typography,
  './modules/views/AppAppBar': AppAppBar,
  './modules/views/AppFooter': AppFooter,
  './modules/withRoot': withRoot,
  './modules/views/terms.md': terms,
};
