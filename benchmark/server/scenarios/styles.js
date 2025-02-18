/* eslint-disable no-console */
import Benchmark from 'benchmark';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import styledComponents, { ServerStyleSheet } from 'styled-components';
import styledEmotion from '@emotion/styled';
import { css } from '@emotion/react';
import { renderStylesToString } from '@emotion/server';
import injectSheet, { JssProvider, SheetsRegistry } from 'react-jss';
import { styled as styledMui, withStyles, makeStyles, StylesProvider } from '@mui/styles';
import jss, { getDynamicStyles } from 'jss';
import Box from '@mui/material/Box';

const suite = new Benchmark.Suite('styles', {
  onError: (event) => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const cssContent = `
display: inline-flex;
align-items: center;
justify-content: center;
position: relative;
background-color: transparent;
outline: 0;
border: 0;
margin: 0;
border-radius: 0;
padding: 0;
cursor: pointer;
user-select: none;
vertical-align: middle;
-moz-appearance: none;
-webkit-appearance: none;
text-decoration: none`;

const cssObject = {
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    textDecoration: 'none',
  },
  // system: () => ({
  //   color: 'blue',
  // }),
};

const emotionCss = css`
  ${cssContent}
`;

const JSSButton = injectSheet(cssObject)((props) => (
  <button type="button" className={props.classes.root} {...props} />
));

const WithStylesButton = withStyles(cssObject)((props) => (
  <button type="submit" className={props.classes.root} {...props} />
));

const EmotionButton = styledEmotion('button')(cssObject.root);
const StyledMuiButton = styledMui('button')(cssObject.root);

const StyledComponentsButton = styledComponents.button`${cssContent}`;

const useStyles = makeStyles(cssObject);
function HookButton(props) {
  const classes = useStyles();
  return <button type="button" className={classes.root} {...props} />;
}

function NakedButton(props) {
  return <button type="submit" {...props} />;
}

function EmotionCssButton(props) {
  // eslint-disable-next-line react/no-unknown-property
  return <button type="submit" css={emotionCss} {...props} />;
}

suite
  .add('StyledMuiButton', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5)).map((_, index) => (
          <StyledMuiButton key={String(index)}>MUI</StyledMuiButton>
        ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('Box', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5)).map((_, index) => (
          <Box key={String(index)} p={2}>
            MUI
          </Box>
        ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('JSS naked', () => {
    const sheetsRegistry = new SheetsRegistry();

    const staticStyles = cssObject;
    const dynamicStyles = getDynamicStyles(staticStyles);

    const staticSheet = jss.createStyleSheet(staticStyles);
    staticSheet.attach({
      link: false,
    });
    sheetsRegistry.add(staticSheet);

    if (dynamicStyles) {
      const dynamicSheet = jss.createStyleSheet(dynamicStyles, {
        link: true,
      });
      dynamicSheet.update({});
      dynamicSheet.attach();
      sheetsRegistry.add(dynamicSheet);
    }

    ReactDOMServer.renderToString(
      <JssProvider registry={sheetsRegistry}>
        {Array.from(new Array(5)).map((_, index) => (
          <button key={String(index)} type="submit">
            MUI
          </button>
        ))}
      </JssProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('JSSButton', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <JssProvider registry={sheetsRegistry}>
        <React.Fragment>
          {Array.from(new Array(5)).map((_, index) => (
            <JSSButton key={String(index)}>MUI</JSSButton>
          ))}
        </React.Fragment>
      </JssProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('WithStylesButton', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5)).map((_, index) => (
          <WithStylesButton key={String(index)}>MUI</WithStylesButton>
        ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('HookButton', () => {
    const sheetsRegistry = new SheetsRegistry();
    ReactDOMServer.renderToString(
      <StylesProvider sheetsManager={new Map()} sheetsRegistry={sheetsRegistry}>
        {Array.from(new Array(5)).map((_, index) => (
          <HookButton key={String(index)}>MUI</HookButton>
        ))}
      </StylesProvider>,
    );
    sheetsRegistry.toString();
  })
  .add('StyledComponentsButton', () => {
    const sheet = new ServerStyleSheet();
    ReactDOMServer.renderToString(
      sheet.collectStyles(
        <React.Fragment>
          {Array.from(new Array(5)).map((_, index) => (
            <StyledComponentsButton key={String(index)}>MUI</StyledComponentsButton>
          ))}
        </React.Fragment>,
      ),
    );
    sheet.getStyleTags();
  })
  .add('EmotionButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        {Array.from(new Array(5)).map((_, index) => (
          <EmotionButton key={String(index)}>MUI</EmotionButton>
        ))}
      </StylesProvider>,
    );
  })
  .add('EmotionCssButton', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        {Array.from(new Array(5)).map((_, index) => (
          <EmotionCssButton key={String(index)}>MUI</EmotionCssButton>
        ))}
      </StylesProvider>,
    );
  })
  .add('EmotionServerCssButton', () => {
    renderStylesToString(
      ReactDOMServer.renderToString(
        <StylesProvider>
          {Array.from(new Array(5)).map((_, index) => (
            <EmotionCssButton key={String(index)}>MUI</EmotionCssButton>
          ))}
        </StylesProvider>,
      ),
    );
  })
  .add('Naked', () => {
    ReactDOMServer.renderToString(
      <StylesProvider>
        {Array.from(new Array(5)).map((_, index) => (
          <NakedButton key={String(index)}>MUI</NakedButton>
        ))}
      </StylesProvider>,
    );
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();
