import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, screen, fireEvent } from 'test/utils';
import createCssVarsProvider from './createCssVarsProvider';

const ThemeContext = React.createContext({
  fontSize: '1rem',
  color: '#000000',
});
const DEFAULT_COLOR_SCHEME = 'light';
const { CssVarsProvider, useColorScheme } = createCssVarsProvider(ThemeContext, {
  baseTheme: { fontSize: { md: '1rem' } },
  colorSchemes: { light: { color: '#000000' }, dark: { color: '#ffffff' } },
  defaultColorScheme: DEFAULT_COLOR_SCHEME,
});

const Consumer = () => {
  const { allColorSchemes, colorScheme, setColorScheme } = useColorScheme();
  return (
    <div>
      <div data-testid="all-color-schemes">{allColorSchemes.join(',')}</div>
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
      <div data-testid="swatch-color">{theme.vars.color}</div>
      <div data-testid="swatch-bgcolor">{theme.vars.bgcolor}</div>
    </div>
  );
};

describe('createCssVarsProvider', () => {
  const render = createClientRender();
  let storage = {};
  before(() => {
    // Create mocks of localStorage getItem and setItem functions
    global.localStorage = {
      getItem: spy((key) => storage[key]),
      setItem: spy((key, value) => {
        storage[key] = value;
      }),
    };
  });

  beforeEach(() => {
    // clear the localstorage
    storage = {};
  });

  describe('colorScheme', () => {
    it('has specified default color scheme', () => {
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

      expect(screen.getByTestId('all-color-schemes').textContent).to.equal('light,dark');

      rerender(
        <CssVarsProvider colorSchemes={{ comfort: { color: '#e5e5e5' } }}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('all-color-schemes').textContent).to.equal('light,dark,comfort');
    });

    it('attach default dataset on body', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(document.body.dataset.colorScheme).to.equal('light');
    });

    it('can set new color scheme', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
      expect(document.body.dataset.colorScheme).to.equal('dark');
    });
  });

  describe('storage', () => {
    it('should save color scheme to localStorage', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(global.localStorage.setItem.lastCall.args).to.eql(['mui-color-scheme', 'light']);

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(global.localStorage.setItem.lastCall.args).to.eql(['mui-color-scheme', 'dark']);
    });

    it('should use color scheme from localStorage if exists', () => {
      storage['mui-color-scheme'] = 'dark';

      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
    });

    it('use custom storageKey', () => {
      const customStorageKey = 'foo-color-scheme';
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
          <CssVarsProvider baseTheme={{ fontSize: { sm: '0.75rem' } }}>
            <Text scale="md" />
            <Text scale="sm" />
          </CssVarsProvider>,
        );

        expect(screen.getByTestId('text-md').textContent).to.equal('var(--fontSize-md)');
        expect(screen.getByTestId('text-sm').textContent).to.equal('var(--fontSize-sm)');
      });

      it('merge design system & custom color scheme', () => {
        render(
          <CssVarsProvider colorSchemes={{ light: { bgcolor: '#ffffff' } }}>
            <Swatch />
          </CssVarsProvider>,
        );

        expect(screen.getByTestId('swatch-color').textContent).to.equal('var(--color)');
        expect(screen.getByTestId('swatch-bgcolor').textContent).to.equal('var(--bgcolor)');
      });
    });
  });
});
