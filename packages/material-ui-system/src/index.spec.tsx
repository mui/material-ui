import {
  compose,
  css,
  palette,
  StyleFunction,
  spacing,
  style,
  breakpoints,
} from '@material-ui/system';
import * as React from 'react';
import styled from 'styled-components';

function composeTest() {
  function first(props: { color: string }) {
    return {};
  }

  function second(props: { spacing: number }) {
    return {};
  }

  const styler = compose(first, second);
  // @ts-expect-error missing `spacing`
  styler({ color: 'test' });
  // @ts-expect-error missing `color`
  styler({ spacing: 1 });
  styler({ color: 'test', spacing: 1 });
}

function cssTest() {
  function styleFunction(props: { color?: string; spacing?: number; theme?: object }) {
    return {};
  }

  const wideOrNarrowStyleFunction = css(styleFunction);

  // narrow
  wideOrNarrowStyleFunction({ theme: {}, css: { color: 'blue', spacing: 2 } });
  // wide, undesire: `css` is required, marking it as optional breaks system/basics/#css-property
  wideOrNarrowStyleFunction({ theme: {}, color: 'blue', spacing: 2, css: {} });
  // wide and narrow
  wideOrNarrowStyleFunction({ theme: {}, css: { color: 'blue', spacing: 2 }, color: 'red' });
}

/**
 * marking a prop as required requires it in props object and `css` object
 *
 * This is not equivalent to the implementation. Ideally `css` would be optional
 * but that breaks system/basics/#css-property
 */
function cssRequiredTest() {
  function styleRequiredFunction(props: { color: string }) {
    return {};
  }

  const style = css(styleRequiredFunction);
  style({
    color: 'red',
    // @ts-expect-error
    css: {},
  });
  // @ts-expect-error
  style({ css: { color: 'red' } });
  style({ color: 'blue', css: { color: 'red' } });
}

/**
 * Testing inference of TypeScript + styled-components + @material-ui/system
 */
function interopTest() {
  const mixin = style({ prop: 'color' });
  // built-in style function
  const SystemSpacingBox = styled.div`
    ${spacing}
    ${mixin}
  `;
  <SystemSpacingBox m={2} />;
}

function breakpointsTest() {
  function styleFunction(props: { color?: string }) {
    return {};
  }

  const styler = breakpoints(styleFunction);
  // Allows styleFunction props
  styler({ color: 'red' });
}
