import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { ThemeProvider, styled } from '@mui/joy/styles';
import defaultTheme from './defaultTheme';

const toPixel = (val: string | number | undefined) => (typeof val === 'number' ? `${val}px` : val);

describe('[Joy] styled', () => {
  const { render } = createRenderer();
  it('use defaultTheme given no ThemeProvider', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }
    const Text = styled('div')(({ theme }) => ({
      borderRadius: theme.vars.radius.md,
    }));

    const { container } = render(<Text />);

    expect(container.firstChild).toHaveComputedStyle({
      borderTopLeftRadius: toPixel(defaultTheme.radius.md),
      borderTopRightRadius: toPixel(defaultTheme.radius.md),
      borderBottomRightRadius: toPixel(defaultTheme.radius.md),
      borderBottomLeftRadius: toPixel(defaultTheme.radius.md),
    });
  });

  it('use theme from ThemeProvider', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }
    const Text = styled('div')(({ theme }) => ({
      borderRadius: theme.vars.radius.md,
    }));

    const { container } = render(
      <ThemeProvider theme={{ radius: { md: '50%' } }}>
        <Text />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      borderBottomLeftRadius: '50%',
    });
  });
});
