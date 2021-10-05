import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, screen } from 'test/utils';
import createDesignSystem from './createDesignSystem';

const { styled, ThemeProvider, CssVarsProvider } = createDesignSystem({
  baseTheme: {
    fontSize: {
      xs: '0.75rem',
      md: '1rem',
    },
  },
  colorSchemes: {
    light: {
      color: '#000000',
      bgcolor: '#f9f9f9',
    },
  },
  defaultColorScheme: 'light',
});

const Text = styled('span')(({ theme, size = 'md' }) => ({
  color: theme.vars.color,
  fontSize: theme.vars.fontSize[size],
}));

describe('createDesignSystem', () => {
  const render = createClientRender();
  let storage = {};
  before(() => {
    // Create mocks of localStorage getItem and setItem functions
    global.localStorage = {
      getItem: (key) => storage[key],
      setItem: (key, value) => {
        storage[key] = value;
      },
    };
  });

  beforeEach(() => {
    // clear the localstorage
    storage = {};
  });

  it('can render a component with default theme', () => {
    render(<Text>Foo</Text>);

    expect(screen.getByText('Foo')).toHaveComputedStyle({ fontSize: '1rem' });
  });

  it('custom theme is merged inside ThemeProvider', () => {
    render(
      <ThemeProvider theme={{ fontSize: { md: '1.5rem' } }}>
        <Text>Medium Text</Text>
        <Text size="xs">ExtraSmall Text</Text>
      </ThemeProvider>,
    );

    expect(screen.getByText('Medium Text')).toHaveComputedStyle({ fontSize: '1.5rem' });
    expect(screen.getByText('ExtraSmall Text')).toHaveComputedStyle({ fontSize: '0.75rem' });
  });

  it('use css variables with CssVarsProvider', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }
    render(
      <CssVarsProvider>
        <Text>Foo</Text>
      </CssVarsProvider>,
    );

    expect(screen.getByText('Foo')).toHaveComputedStyle({ fontSize: 'var(--fontSize-md)' });
  });

  describe('multiple design systems', () => {
    const { styled: styled2, ThemeProvider: ThemeProvider2 } = createDesignSystem({
      baseTheme: {
        fontSize: {
          xs: '0.75rem',
          md: '2rem',
        },
      },
      colorSchemes: {
        light: {
          color: '#000000',
          bgcolor: '#f9f9f9',
        },
      },
      defaultColorScheme: 'light',
    });

    const Text2 = styled2('span')(({ theme, size = 'md' }) => ({
      color: theme.vars.color,
      fontSize: theme.vars.fontSize[size],
    }));

    it('each design system is independent', () => {
      render(
        <ThemeProvider theme={{ fontSize: { md: '1.1rem' } }}>
          <ThemeProvider2 theme={{ fontSize: { md: '2.2rem' } }}>
            <Text>Text 1</Text>
            <Text2>Text 2</Text2>
          </ThemeProvider2>
          <Text2>TextDefault 2</Text2>
        </ThemeProvider>,
      );

      expect(screen.getByText('Text 1')).toHaveComputedStyle({ fontSize: '1.1rem' });
      expect(screen.getByText('Text 2')).toHaveComputedStyle({ fontSize: '2.2rem' });
      expect(screen.getByText('TextDefault 2')).toHaveComputedStyle({ fontSize: '2rem' });
    });
  });
});
