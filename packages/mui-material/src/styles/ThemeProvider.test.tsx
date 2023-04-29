import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';

describe('ThemeProvider', () => {
  const { render } = createRenderer();
  it('When theme is a function, it should not show warning', () => {
    expect(() =>
      render(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={() => ({})} />
        </ThemeProvider>,
      ),
    ).not.toWarnDev();
  });
});
