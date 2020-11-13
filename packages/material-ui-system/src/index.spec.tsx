import {
  compose,
  styleFunctionSx,
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

function sxTest() {
  function styleFunction(props: { color?: string; spacing?: number; theme?: object }) {
    return {};
  }

  const wideOrNarrowStyleFunction = styleFunctionSx(styleFunction);

  // narrow
  wideOrNarrowStyleFunction({ theme: {}, sx: { color: 'blue', spacing: 2 } });
  // wide
  wideOrNarrowStyleFunction({ theme: {}, color: 'blue', spacing: 2 });
  // wide and narrow
  wideOrNarrowStyleFunction({ theme: {}, sx: { color: 'blue', spacing: 2 }, color: 'red' });
}

/**
 * marking a prop as required requires it in props object and `sx` object
 *
 * This is not equivalent to the implementation. Ideally `sx` would be optional
 * but that breaks system/basics/#sx-property
 */
function sxRequiredTest() {
  function styleRequiredFunction(props: { color: string }) {
    return {};
  }

  const style = styleFunctionSx(styleRequiredFunction);
  style({
    color: 'red',
    // @ts-expect-error
    sx: {},
  });
  // @ts-expect-error
  style({ sx: { color: 'red' } });
  style({ color: 'blue', sx: { color: 'red' } });
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
