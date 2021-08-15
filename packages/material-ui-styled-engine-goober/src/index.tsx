import * as React from 'react';
import { styled as styledGoober, setup } from 'goober';
import unitless from '@emotion/unitless';
import { prefix } from 'goober/prefixer';

export const ThemeContext = React.createContext({});

// TODO drop hard coded function
function shouldForwardProp(prop: string) {
  return prop !== 'styleProps' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

const useTheme = () => React.useContext(ThemeContext);

function forwardProps(props: object) {
  Object.keys(props).forEach((prop) => {
    // Or any other conditions.
    // This could also check if this is a dev build and not remove the props
    if (!shouldForwardProp(prop)) {
      // @ts-ignore
      delete props[prop];
    }
  });
}

function isCustomProperty(property: string) {
  // 45 is -
  return property.charCodeAt(1) === 45;
}

function camelize(str: string) {
  return str.replace(/-./g, (chunk) => chunk[1].toUpperCase());
}

function plugins(property: string, inValue: any) {
  // Add default px unit when needed
  let value = inValue;
  const key = camelize(property);
  if (
    unitless[key] !== 1 &&
    !isCustomProperty(property) &&
    typeof value === 'number' &&
    value !== 0
  ) {
    value = `${value}px`;
  }

  return prefix(property, value);
}

// @ts-expect-error Wrong type https://github.com/cristianbote/goober/pull/364
setup(React.createElement, plugins, useTheme, forwardProps);

// TODO hanle options
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function styled(tag: any, options: any) {
  const stylesFactory = styledGoober(tag, React.forwardRef);

  return (...styles: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      const component = typeof tag === 'string' ? `"${tag}"` : 'component';
      if (styles.length === 0) {
        console.error(
          [
            `Material-UI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`,
            'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.',
          ].join('\n'),
        );
      } else if (styles.some((style) => style === undefined)) {
        console.error(
          `Material-UI: the styled(${component})(...args) API requires all its args to be defined.`,
        );
      }
    }

    // @ts-ignore
    return stylesFactory(styles);
  };
}

export { keyframes, css } from 'goober';
export { default as StyledEngineProvider } from './StyledEngineProvider';
export { default as GlobalStyles } from './GlobalStyles';
