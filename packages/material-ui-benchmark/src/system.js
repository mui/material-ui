/* eslint-disable no-console */

import Benchmark from 'benchmark';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import styledEmotion from '@emotion/styled';
import { ThemeProvider as EmotionTheme } from 'emotion-theming';
import { space, color, fontFamily, fontSize, compose as compose2 } from 'styled-system';
import { spacing, palette, typography, compose } from '@material-ui/system';
import { createMuiTheme } from '@material-ui/core/styles';
import { styleFunction } from '@material-ui/core/Box';
import { styled, ThemeProvider as StylesThemeProvider } from '@material-ui/styles';
import styledComponents, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

const suite = new Benchmark.Suite('system', {
  onError: event => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const materialSystem = compose(
  palette,
  spacing,
  typography,
);
const styledSystem = compose2(color, space, fontFamily, fontSize);

const BoxStyles = styled('div')(styleFunction);
const BoxStyleComponents = styledComponents('div')(styleFunction);
const BoxEmotion = styledEmotion('div')(styleFunction);

const BoxMaterialSystem = styledComponents.div`${materialSystem}`;
const BoxStyledSystem = styledComponents.div`${styledSystem}`;

const materialSystemTheme = createMuiTheme();

const styledSystemTheme = createMuiTheme();
styledSystemTheme.breakpoints = null;
styledSystemTheme.colors = styledSystemTheme.palette;
styledSystemTheme.fontSizes = styledSystemTheme.typography;
styledSystemTheme.fonts = styledSystemTheme.typography;

suite
  // ---
  .add('colors @material-ui/system ', () => {
    palette({
      theme: {},
      bgcolor: ['red', 'blue'],
    });
  })
  .add('colors styled-system', () => {
    color({
      theme: {},
      bg: ['red', 'blue'],
    });
  })
  // ---
  .add('spaces @material-ui/system', () => {
    spacing({
      theme: {},
      p: [1, 2, 3],
    });
  })
  .add('spaces styled-system', () => {
    space({
      theme: {},
      p: [1, 2, 3],
    });
  })
  // ---
  .add('compose @material-ui/system', () => {
    materialSystem({
      theme: materialSystemTheme,
      color: 'primary.main',
      bgcolor: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  .add('compose styled-system', () => {
    styledSystem({
      theme: styledSystemTheme,
      color: 'primary.main',
      bg: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  // ---
  .add('@material-ui/core all-inclusive', () => {
    styleFunction({
      theme: materialSystemTheme,
      color: 'primary.main',
      bgcolor: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  // ---
  .add('styled-components Box + @material-ui/system', () => {
    ReactDOMServer.renderToString(
      <StyledComponentsThemeProvider theme={materialSystemTheme}>
        <BoxMaterialSystem
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
        >
          @material-ui/system
        </BoxMaterialSystem>
      </StyledComponentsThemeProvider>,
    );
  })
  .add('styled-components Box + styled-system', () => {
    ReactDOMServer.renderToString(
      <StyledComponentsThemeProvider theme={styledSystemTheme}>
        <BoxStyledSystem
          color="primary.main"
          bg="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
        >
          styled-system
        </BoxStyledSystem>
      </StyledComponentsThemeProvider>,
    );
  })
  // // ---
  .add('Box emotion', () => {
    ReactDOMServer.renderToString(
      <EmotionTheme theme={styledSystemTheme}>
        <BoxEmotion
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
          fuu={Math.round(Math.random() * 10000)}
        >
          emotion
        </BoxEmotion>
      </EmotionTheme>,
    );
  })
  .add('Box @material-ui/styles', () => {
    ReactDOMServer.renderToString(
      <StylesThemeProvider theme={materialSystemTheme}>
        <BoxStyles
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
          fuu={Math.round(Math.random() * 10000)}
        >
          @material-ui/styles
        </BoxStyles>
      </StylesThemeProvider>,
    );
  })
  .add('Box styled-components', () => {
    ReactDOMServer.renderToString(
      <StyledComponentsThemeProvider theme={materialSystemTheme}>
        <BoxStyleComponents
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
          fuu={Math.round(Math.random() * 10000)}
        >
          styled-components
        </BoxStyleComponents>
      </StyledComponentsThemeProvider>,
    );
  })
  .on('cycle', event => {
    console.log(String(event.target));
  })
  .run();
