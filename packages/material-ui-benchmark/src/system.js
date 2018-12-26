/* eslint-disable no-console */

import './bootstrap';
import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import styledEmotion from '@emotion/styled';
import { space, color, fontFamily, fontSize, compose as compose2 } from 'styled-system';
import { spacing, palette, typography, compose } from '@material-ui/system';
import { createMuiTheme } from '@material-ui/core/styles';
import { styleFunction } from '@material-ui/core/Box/Box';
import { styled } from '@material-ui/styles';
import styled2, { ThemeProvider } from 'styled-components';

const mui = compose(
  palette,
  spacing,
  typography,
);
const ss = compose2(color, space, fontFamily, fontSize);

const BoxMUI = styled2.div`${mui}`;
const BoxMUIStyles = styled('div')(mui);
const BoxEmotion = styledEmotion(mui);
const BoxSS = styled2.div`${ss}`;

const suite = new Benchmark.Suite('ssr', {
  onError: event => {
    console.log(event.target.error);
  },
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const ssTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

ssTheme.breakpoints = null;
ssTheme.colors = ssTheme.palette;
ssTheme.fontSizes = ssTheme.typography;
ssTheme.fonts = ssTheme.typography;

Benchmark.options.minSamples = 100;

suite
  .add('@material-ui/core all-inclusive', () => {
    styleFunction({
      theme,
      color: 'primary.main',
      bgcolor: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  .add('@material-ui/system palette', () => {
    palette({
      theme: {},
      bg: ['red', 'blue'],
    });
  })
  .add('styled-system color', () => {
    color({
      theme: {},
      bg: ['red', 'blue'],
    });
  })
  .add('@material-ui/system spacing', () => {
    spacing({
      theme: {},
      p: [1, 2, 3],
    });
  })
  .add('styled-system space', () => {
    space({
      theme: {},
      p: [1, 2, 3],
    });
  })
  .add('@material-ui/system composed', () => {
    mui({
      theme,
      color: 'primary.main',
      bgcolor: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: 'h6.fontSize',
      p: 2,
      sm: { fontSize: 'h4.fontSize', p: 3 },
      md: { fontSize: 'h3.fontSize', p: 4 },
    });
  })
  .add('styled-system composed', () => {
    ss({
      theme: ssTheme,
      color: 'primary.main',
      bgcolor: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  .add('@material-ui/system Box', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={theme}>
        <BoxMUI
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize="h6.fontSize"
          p={2}
          sm={{ fontSize: 'h4.fontSize', p: 3 }}
          md={{ fontSize: 'h3.fontSize', p: 4 }}
        >
          @material-ui/system
        </BoxMUI>
      </ThemeProvider>,
    );
  })
  .add('@material-ui/styles Box', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={theme}>
        <BoxMUIStyles
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize="h6.fontSize"
          p={2}
          sm={{ fontSize: 'h4.fontSize', p: 3 }}
          md={{ fontSize: 'h3.fontSize', p: 4 }}
        >
          @material-ui/styles
        </BoxMUIStyles>
      </ThemeProvider>,
    );
  })
  .add('styled-system Box', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={ssTheme}>
        <BoxSS
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
        >
          styled-system
        </BoxSS>
      </ThemeProvider>,
    );
  })
  .add('emotion Box', () => {
    ReactDOMServer.renderToString(
      <ThemeProvider theme={ssTheme}>
        <BoxEmotion
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
        >
          emotion
        </BoxEmotion>
      </ThemeProvider>,
    );
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
