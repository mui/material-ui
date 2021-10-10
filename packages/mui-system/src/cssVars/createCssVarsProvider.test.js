import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, screen, fireEvent } from 'test/utils';
import createCssVarsProvider from './createCssVarsProvider';

const ThemeContext = React.createContext();
const DEFAULT_COLOR_SCHEME = 'light';
const { CssVarsProvider, useMode } = createCssVarsProvider(ThemeContext, {
  theme: {
    fontSize: { md: '1rem' },
    palette: {
      light: { color: '#000000' },
      dark: { color: '#ffffff' },
    },
  },
  defaultMode: DEFAULT_COLOR_SCHEME,
});

const Consumer = () => {
  const { allModes, mode, setMode } = useMode();
  return (
    <div>
      <div data-testid="all-modes">{allModes.join(',')}</div>
      <div data-testid="current-mode">{mode}</div>
      <button onClick={() => setMode('dark')}>change to dark</button>
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
      <div data-testid="swatch-bgcolor">{theme.vars.palette.bgcolor}</div>
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

  describe('mode', () => {
    it('has specified default mode', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode').textContent).to.equal('light');
    });

    it('can get allModes', () => {
      const { rerender } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('all-modes').textContent).to.equal('light,dark');

      rerender(
        <CssVarsProvider theme={{ palette: { comfort: { color: '#e5e5e5' } } }}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('all-modes').textContent).to.equal('light,dark,comfort');
    });

    it('attach default dataset on body', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(document.body.dataset.muiMode).to.equal('light');
    });

    it('can set new mode', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
      expect(document.body.dataset.muiMode).to.equal('dark');
    });
  });

  describe('storage', () => {
    it('should save mode to localStorage', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(global.localStorage.setItem.lastCall.args).to.eql(['mui-mode', 'light']);

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(global.localStorage.setItem.lastCall.args).to.eql(['mui-mode', 'dark']);
    });

    it('should use mode from localStorage if exists', () => {
      storage['mui-mode'] = 'dark';

      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
    });

    it('use custom storageKey', () => {
      const customStorageKey = 'foo-mode';
      storage[customStorageKey] = 'dark';

      render(
        <CssVarsProvider storageKey={customStorageKey}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
      expect(global.localStorage.setItem.lastCall.args).to.eql([customStorageKey, 'dark']);
    });

    it('use custom dataAttribute', () => {
      const customDataAttribute = 'foo-bar';

      render(
        <CssVarsProvider dataAttribute={customDataAttribute}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(document.body.dataset.fooBar).to.equal('light');
    });
  });

  describe('theme.vars', () => {
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

      it('merge design system & custom mode', () => {
        render(
          <CssVarsProvider theme={{ palette: { light: { bgcolor: '#ffffff' } } }}>
            <Swatch />
          </CssVarsProvider>,
        );

        expect(screen.getByTestId('swatch-color').textContent).to.equal('var(--palette-color)');
        expect(screen.getByTestId('swatch-bgcolor').textContent).to.equal('var(--palette-bgcolor)');
      });
    });
  });
});
