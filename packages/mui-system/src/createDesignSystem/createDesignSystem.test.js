import { expect } from 'chai';
import * as React from 'react';
import { createClientRender, screen } from 'test/utils';
import createDesignSystem from './createDesignSystem';

const { styled, ThemeProvider, CssVarsProvider, useTheme } = createDesignSystem({
  baseTheme: {
    fontSize: {
      xs: '12px',
      md: '16px',
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
  before(function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }
  });

  it('can render a component with default theme', function test() {
    render(<Text>Foo</Text>);

    expect(screen.getByText('Foo')).toHaveComputedStyle({ fontSize: '16px' });
  });

  it('custom theme is merged inside ThemeProvider', function test() {
    render(
      <ThemeProvider theme={{ fontSize: { md: '18px' } }}>
        <Text>Medium Text</Text>
        <Text size="xs">ExtraSmall Text</Text>
      </ThemeProvider>,
    );

    expect(screen.getByText('Medium Text')).toHaveComputedStyle({ fontSize: '18px' });
    expect(screen.getByText('ExtraSmall Text')).toHaveComputedStyle({ fontSize: '12px' });
  });

  it('use css variables with CssVarsProvider', function test() {
    const WrappedText = (props) => {
      const theme = useTheme();
      return <Text {...props}>{theme.vars.fontSize.md}</Text>;
    };
    render(
      <CssVarsProvider baseTheme={{ fontSize: { md: '22px' } }}>
        <WrappedText data-testid="css-vars-text" />
      </CssVarsProvider>,
    );

    expect(screen.getByTestId('css-vars-text')).toHaveComputedStyle({ fontSize: '22px' });
    expect(screen.getByTestId('css-vars-text').textContent).to.equal('var(--fontSize-md)');
  });

  describe('multiple design systems', () => {
    const { styled: styled2, ThemeProvider: ThemeProvider2 } = createDesignSystem({
      baseTheme: {
        fontSize: {
          xs: '10px',
          md: '24px',
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

    it('each design system is independent', function test() {
      render(
        <ThemeProvider theme={{ fontSize: { md: '17px' } }}>
          <ThemeProvider2 theme={{ fontSize: { md: '25px' } }}>
            <Text>Text 1</Text>
            <Text2>Text 2</Text2>
          </ThemeProvider2>
          <Text2>TextDefault 2</Text2>
        </ThemeProvider>,
      );

      expect(screen.getByText('Text 1')).toHaveComputedStyle({ fontSize: '17px' });
      expect(screen.getByText('Text 2')).toHaveComputedStyle({ fontSize: '25px' });
      expect(screen.getByText('TextDefault 2')).toHaveComputedStyle({ fontSize: '24px' });
    });
  });
});
