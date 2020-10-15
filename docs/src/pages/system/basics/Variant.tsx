import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import {
  PropsFor,
  style,
  typography,
  TypographyProps,
} from '@material-ui/system';

const variant = style({
  prop: 'variant',
  cssProperty: false,
  themeKey: 'typography',
});

const Text = styled.span<PropsFor<typeof variant> & TypographyProps>`
  font-family: Helvetica, sans-serif;
  ${variant}
  ${typography}
`;

const theme = {
  typography: {
    h1: {
      fontSize: 30,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: 25,
      lineHeight: 1.5,
    },
  },
};

export default function Variant() {
  return (
    <NoSsr>
      <ThemeProvider theme={theme}>
        <div>
          <Text variant="h1" as="div">
            variant=h1
          </Text>
          <Text variant="h1" fontWeight={300} as="div">
            fontWeight=300
          </Text>
          <Text variant="h2" as="div">
            variant=h2
          </Text>
        </div>
      </ThemeProvider>
    </NoSsr>
  );
}
