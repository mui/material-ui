import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, screen, fireEvent } from 'test/utils';
import createCssVarsProvider from './createCssVarsProvider';

const ThemeContext = React.createContext();
const DEFAULT_COLOR_SCHEME = 'light';
const { CssVarsProvider, useColorScheme } = createCssVarsProvider(ThemeContext, {
  theme: {
    fontSize: { md: '1rem', sm: null },
    colorSchemes: {
      light: {
        palette: {
          color: '#000000',
        },
      },
      dark: {
        palette: {
          color: '#ffffff',
        },
      },
    },
    // TODO: create a separate test or remove the function
    getContrastText: () => '#fff', // function should have no effect
  },
  defaultColorScheme: DEFAULT_COLOR_SCHEME,
});

const Consumer = () => {
  const { allColorSchemes, colorScheme, setColorScheme } = useColorScheme();
  return (
    <div>
      <div data-testid="all-colorSchemes">{allColorSchemes.join(',')}</div>
      <div data-testid="current-color-scheme">{colorScheme}</div>
      <button onClick={() => setColorScheme('dark')}>change to dark</button>
    </div>
  );
};

const Text = ({ scale = 'md' }) => {
  const theme = React.useContext(ThemeContext);
  return <div data-testid={`text-${scale}`}>{theme.vars.fontSize[scale]}</div>;
};

const Swatch = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <div>
      <div data-testid="swatch-color">{theme.vars.palette.color}</div>
      <div data-testid="swatch-color-value">{theme.palette.color}</div>
      <div data-testid="swatch-bgcolor">{theme.vars.palette.bgcolor}</div>
      <div data-testid="swatch-bgcolor-value">{theme.palette.bgcolor}</div>
    </div>
  );
};

describe('createCssVarsProvider', () => {
  const render = createClientRender();
  let storage = {};
  before(() => {
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: spy((key) => storage[key]),
        setItem: spy((key, value) => {
          storage[key] = value;
        }),
      },
      configurable: true,
    });
  });

  beforeEach(() => {
    // clear the localstorage
    storage = {};
  });

  describe('colorScheme', () => {
    it('has specified default colorScheme', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('light');
    });

    it('can get allColorSchemes', () => {
      const { rerender } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('all-colorSchemes').textContent).to.equal('light,dark');

      rerender(
        <CssVarsProvider theme={{ colorSchemes: { comfort: { palette: { color: '#e5e5e5' } } } }}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('all-colorSchemes').textContent).to.equal('light,dark,comfort');
    });

    it('attach default dataset on body', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(document.body.getAttribute('data-mui-color-scheme')).to.equal('light');
    });

    it('can set new colorScheme', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
      expect(document.body.getAttribute('data-mui-color-scheme')).to.equal('dark');
    });
  });

  describe('storage', () => {
    it('should save colorScheme to localStorage', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(global.localStorage.setItem.lastCall.args).to.eql(['mui-color-scheme', 'light']);

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(global.localStorage.setItem.lastCall.args).to.eql(['mui-color-scheme', 'dark']);
    });

    it('should use colorScheme from localStorage if exists', () => {
      storage['mui-color-scheme'] = 'dark';

      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
    });

    it('use custom storageKey', () => {
      const customStorageKey = 'foo-colorScheme';
      storage[customStorageKey] = 'dark';

      render(
        <CssVarsProvider storageKey={customStorageKey}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
      expect(global.localStorage.setItem.lastCall.args).to.eql([customStorageKey, 'dark']);
    });

    it('use custom dataAttribute', () => {
      const customAttribute = 'data-foo-bar';

      render(
        <CssVarsProvider attribute={customAttribute}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(document.body.getAttribute('data-foo-bar')).to.equal('light');
    });
  });

  describe('custom theme', () => {
    it('merge design system theme with custom theme', () => {
      render(
        <CssVarsProvider theme={{ fontSize: { sm: '0.75rem' } }}>
          <Text scale="md" />
          <Text scale="sm" />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text-md').textContent).to.equal('var(--fontSize-md)');
      expect(screen.getByTestId('text-sm').textContent).to.equal('var(--fontSize-sm)');
    });

    it('merge design system & custom colorScheme', () => {
      render(
        <CssVarsProvider theme={{ colorSchemes: { light: { palette: { bgcolor: '#ffffff' } } } }}>
          <Swatch />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('swatch-color').textContent).to.equal('var(--palette-color)');
      expect(screen.getByTestId('swatch-bgcolor').textContent).to.equal('var(--palette-bgcolor)');
    });

    it('extend palette colorSchemes', () => {
      const comfortColor = '#007FFF';
      render(
        <CssVarsProvider
          defaultColorScheme="comfort"
          theme={{
            colorSchemes: {
              comfort: {
                palette: {
                  color: comfortColor,
                },
              },
            },
          }}
        >
          <Swatch />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('swatch-color').textContent).to.equal('var(--palette-color)');
      expect(screen.getByTestId('swatch-color-value').textContent).to.equal(comfortColor);
    });
  });
});
