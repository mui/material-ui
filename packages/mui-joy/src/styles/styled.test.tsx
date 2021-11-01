import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import { ThemeProvider, styled } from '@mui/joy/styles';
import defaultTheme from './defaultTheme';

const toPixel = (val: string | number | undefined) => (typeof val === 'number' ? `${val}px` : val);

describe('[Joy] styled', () => {
  const render = createClientRender();
  it('use defaultTheme given no ThemeProvider', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }
    const Text = styled('div')(({ theme }) => ({
      borderRadius: theme.vars.borderRadius.md,
    }));

    const { container } = render(<Text />);

    expect(container.firstChild).toHaveComputedStyle({
      borderRadius: toPixel(defaultTheme.borderRadius.md),
    });
  });

  it('use theme from ThemeProvider', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }
    const Text = styled('div')(({ theme }) => ({
      borderRadius: theme.vars.borderRadius.md,
    }));

    const { container } = render(
      <ThemeProvider theme={{ borderRadius: { md: '50%' } }}>
        <Text />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({ borderRadius: '50%' });
  });
});
