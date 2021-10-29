import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, screen, fireEvent } from 'test/utils';
import createCssVarsProvider from './createCssVarsProvider';
import { DEFAULT_ATTRIBUTE, DEFAULT_STORAGE_KEY } from './getInitColorSchemeScript';
import useTheme from '../useTheme';

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

  describe('[Design System] CssVarsProvider', () => {
    it('display error if `defaultColorScheme` does not exist in theme.colorSchemes', () => {
      expect(() =>
        createCssVarsProvider({
          theme: {},
          defaultColorScheme: 'light',
        }),
      ).toErrorDev('MUI: `light` does not exist in `theme.colorSchemes`.');
    });

    it('has specified default colorScheme', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });
      const Consumer = () => {
        const { colorScheme } = useColorScheme();
        return <div data-testid="current-color-scheme">{colorScheme}</div>;
      };
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('light');
    });

    it('has css variable prefix', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: { fontSize: 16 } },
        },
        defaultColorScheme: 'light',
        prefix: 'mui',
      });
      const Text = () => {
        const theme = useTheme();
        return <div data-testid={`text`}>{theme.vars.fontSize}</div>;
      };
      render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text').textContent).to.equal('var(--mui-fontSize)');
    });

    it('can access to allColorSchemes', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: {
          colorSchemes: {
            light: {},
            dark: {},
          },
        },
        defaultColorScheme: 'light',
      });
      const Consumer = () => {
        const { allColorSchemes } = useColorScheme();
        return <div data-testid="all-colorSchemes">{allColorSchemes.join(',')}</div>;
      };
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

    it('can set new colorScheme', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {}, dark: {} },
        },
        defaultColorScheme: 'light',
      });
      const Consumer = () => {
        const { colorScheme, setColorScheme } = useColorScheme();
        return (
          <div>
            <div data-testid="current-color-scheme">{colorScheme}</div>
            <button onClick={() => setColorScheme('dark')}>change to dark</button>
          </div>
        );
      };
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
      expect(document.body.getAttribute('data-mui-color-scheme')).to.equal('dark');
    });

    it('display error if non-existed colorScheme is set', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });
      const Consumer = () => {
        const { setColorScheme } = useColorScheme();
        return <button onClick={() => setColorScheme('foo')}>change to dark</button>;
      };

      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(() =>
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' })),
      ).toErrorDev('`foo` does not exist in `theme.colorSchemes`.');
    });
  });

  describe('DOM', () => {
    it('attach default dataset on body', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });
      render(<CssVarsProvider />);

      expect(document.body.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('light');
    });

    it('use custom attribute', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });
      const customAttribute = 'data-foo-bar';

      render(<CssVarsProvider attribute={customAttribute} />);

      expect(document.body.getAttribute('data-foo-bar')).to.equal('light');
    });
  });

  describe('Storage', () => {
    const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
      theme: {
        colorSchemes: { light: {}, dark: {} },
      },
      defaultColorScheme: 'light',
    });
    const Consumer = () => {
      const { colorScheme, setColorScheme } = useColorScheme();
      return (
        <div>
          <div data-testid="current-color-scheme">{colorScheme}</div>
          <button onClick={() => setColorScheme('dark')}>change to dark</button>
        </div>
      );
    };
    it('should save colorScheme to localStorage', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(global.localStorage.setItem.lastCall.args).to.eql([DEFAULT_STORAGE_KEY, 'light']);

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(global.localStorage.setItem.lastCall.args).to.eql([DEFAULT_STORAGE_KEY, 'dark']);
    });

    it('should use colorScheme from localStorage if exists', () => {
      storage[DEFAULT_STORAGE_KEY] = 'dark';

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
  });

  /**
   * This can occur if two application use default storage key
   * App I: supported color scheme ['light', 'dark', 'purple']
   * App II: supported color scheme ['light', 'dark', 'orange']
   *
   * If you are one App I with color scheme 'purple', when open App II it should fallback
   * to default color scheme of App II because App II does not support 'purple'
   */
  describe('Unsupported color scheme', () => {
    const { CssVarsProvider } = createCssVarsProvider({
      theme: {
        colorSchemes: {
          light: {
            color: 'light',
          },
          dark: {
            color: 'dark',
          },
        },
      },
      defaultColorScheme: 'light',
    });
    const Color = () => {
      const theme = useTheme();
      return <div data-testid="color">{theme.vars.color}</div>;
    };
    it('use default color scheme if the storage value does not exist', () => {
      storage[DEFAULT_STORAGE_KEY] = 'unknown';

      render(
        <CssVarsProvider>
          <Color />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('color').textContent).to.equal('var(--color)');
    });
  });

  describe('[Application] Customization', () => {
    it('merge custom theme', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          fontSize: { md: '1rem', sm: null },
          colorSchemes: {
            light: {},
          },
        },
        defaultColorScheme: 'light',
      });
      const Text = ({ scale = 'md' }) => {
        const theme = useTheme();
        return <div data-testid={`text-${scale}`}>{theme.vars.fontSize[scale]}</div>;
      };
      render(
        <CssVarsProvider theme={{ fontSize: { sm: '0.75rem' } }}>
          <Text scale="md" />
          <Text scale="sm" />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text-md').textContent).to.equal('var(--fontSize-md)');
      expect(screen.getByTestId('text-sm').textContent).to.equal('var(--fontSize-sm)');
    });

    it('merge custom colorSchemes', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: {
            light: {
              palette: {
                color: '#000000',
              },
            },
          },
        },
        defaultColorScheme: 'light',
      });
      const Swatch = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="swatch-color">{theme.vars.palette.color}</div>
            <div data-testid="swatch-color-value">{theme.palette.color}</div>
          </div>
        );
      };
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

    it('extend palette property in colorSchemes', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: {
            light: {
              palette: {
                color: '#000000',
              },
            },
          },
        },
        defaultColorScheme: 'light',
      });
      const Swatch = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="swatch-color">{theme.vars.palette.color}</div>
            <div data-testid="swatch-bgcolor">{theme.vars.palette.bgcolor}</div>
          </div>
        );
      };
      render(
        <CssVarsProvider theme={{ colorSchemes: { light: { palette: { bgcolor: '#ffffff' } } } }}>
          <Swatch />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('swatch-color').textContent).to.equal('var(--palette-color)');
      expect(screen.getByTestId('swatch-bgcolor').textContent).to.equal('var(--palette-bgcolor)');
    });

    it('able to override css variable prefix', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: { fontSize: 16 } },
        },
        defaultColorScheme: 'light',
        prefix: 'mui',
      });
      const Text = () => {
        const theme = useTheme();
        return <div data-testid={`text`}>{theme.vars.fontSize}</div>;
      };
      render(
        <CssVarsProvider prefix="foo-bar">
          <Text />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text').textContent).to.equal('var(--foo-bar-fontSize)');
    });
  });
});
