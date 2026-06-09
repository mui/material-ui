import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TransitionGroup } from 'react-transition-group';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0057b8',
    },
    secondary: {
      main: '#0f766e',
    },
    background: {
      default: '#f7f8fa',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const transitions = [
  ['Fade', Fade],
  ['Grow', Grow],
  ['Collapse', Collapse],
  ['Slide', Slide, { direction: 'up' }],
  ['Zoom', Zoom],
];

const serverItems = ['Primary navigation', 'Account menu', 'Settings panel'];

function TransitionPanel({ name, TransitionComponent, transitionProps = {} }) {
  return React.createElement(
    TransitionComponent,
    { in: true, timeout: 0, ...transitionProps },
    React.createElement(
      Box,
      {
        component: 'section',
        sx: {
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: 'background.paper',
          px: 2,
          py: 1.5,
        },
      },
      React.createElement(
        Typography,
        { component: 'h2', variant: 'h6' },
        `${name} rendered on the server`,
      ),
      React.createElement(
        Typography,
        { color: 'text.secondary', variant: 'body2' },
        'This component imports Material UI transition internals through the published ESM build.',
      ),
    ),
  );
}

function TransitionGroupPanel() {
  return React.createElement(
    Box,
    {
      component: 'section',
      sx: {
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        bgcolor: 'background.paper',
        px: 2,
        py: 1.5,
      },
    },
    React.createElement(
      Typography,
      { component: 'h2', variant: 'h6' },
      'TransitionGroup rendered on the server',
    ),
    React.createElement(
      List,
      { dense: true, sx: { mt: 1 } },
      React.createElement(
        TransitionGroup,
        null,
        serverItems.map((item) =>
          React.createElement(
            Collapse,
            { key: item, timeout: 0 },
            React.createElement(
              ListItem,
              { disablePadding: true },
              React.createElement(ListItemText, { primary: item }),
            ),
          ),
        ),
      ),
    ),
  );
}

export default function App() {
  return React.createElement(
    ThemeProvider,
    { theme },
    React.createElement(CssBaseline),
    React.createElement(
      Box,
      {
        component: 'main',
        sx: {
          maxWidth: 760,
          mx: 'auto',
          px: 3,
          py: 5,
        },
      },
      React.createElement(
        Typography,
        { component: 'h1', variant: 'h4', gutterBottom: true },
        'Node ESM SSR with Material UI',
      ),
      React.createElement(
        Typography,
        { color: 'text.secondary', sx: { mb: 3 } },
        'A minimal server-rendered app that runs MUI transition components through Node native ESM.',
      ),
      React.createElement(
        Stack,
        { spacing: 2 },
        transitions.map(([name, TransitionComponent, transitionProps]) =>
          React.createElement(TransitionPanel, {
            key: name,
            name,
            TransitionComponent,
            transitionProps,
          }),
        ),
        React.createElement(TransitionGroupPanel, { key: 'TransitionGroup' }),
      ),
    ),
  );
}
