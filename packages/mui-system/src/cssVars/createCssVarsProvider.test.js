import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent } from 'test/utils';
import createCssVarsProvider, { DISABLE_CSS_TRANSITION } from './createCssVarsProvider';
import { DEFAULT_ATTRIBUTE, DEFAULT_MODE_STORAGE_KEY } from './getInitColorSchemeScript';
import useTheme from '../useTheme';

describe('createCssVarsProvider', () => {
  const { clock, render } = createRenderer();
  let originalMatchmedia;
  let storage = {};
  const createMatchMedia = (matches) => () => ({
    matches,
    addListener: () => {},
    removeListener: () => {},
  });
  let shouldSupportColorScheme;

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;

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

    // clear the localstorage
    storage = {};
    window.matchMedia = createMatchMedia(false);

    // Currently supported Firefox does not support `color-scheme`.
    // Instead of skipping relevant tests entirely we assert that they work differently in Firefox.
    // This ensures that we're automatically notified once we remove older Firefox versions from the support matrix.
    shouldSupportColorScheme = !/Firefox/.test(navigator.userAgent);
  });
  afterEach(() => {
    window.matchMedia = originalMatchmedia;
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

    it('has CSS variable prefix', () => {
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

    it('provide getCssVar util', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: { palette: { primary: { 500: '#ff5252' } } } },
        },
        defaultColorScheme: 'light',
        prefix: 'mui',
      });
      const Text = () => {
        const theme = useTheme();
        return <div data-testid={`text`}>{theme.getCssVar('palette-primary-500')}</div>;
      };
      render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text').textContent).to.equal('var(--mui-palette-primary-500)');
    });

    it('provide getColorSchemeSelector util', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: { palette: { primary: { 500: '#ff5252' } } } },
        },
        defaultColorScheme: 'light',
      });
      const Text = () => {
        const theme = useTheme();
        return <div data-testid={`text`}>{theme.getColorSchemeSelector('light')}</div>;
      };
      render(
        <CssVarsProvider attribute="data-custom-color-scheme">
          <Text />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text').textContent).to.equal(
        '[data-custom-color-scheme="light"] &',
      );
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
        <CssVarsProvider
          theme={{
            colorSchemes: { light: {}, dark: {}, comfort: { palette: { color: '#e5e5e5' } } },
          }}
        >
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
      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('dark');
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

    it('does not create css var if shouldSkipGeneratingVar return true', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: {
            light: {
              typography: {
                htmlFontSize: '16px',
                h1: {
                  fontSize: '1rem',
                  fontWeight: 500,
                },
              },
            },
          },
        },
        defaultColorScheme: 'light',
        shouldSkipGeneratingVar: (keys) => keys[0] === 'typography' && keys[1] === 'h1',
      });
      const Consumer = () => {
        const theme = useTheme();
        return <div data-testid="h1">{theme.vars.typography.h1 || ''}</div>;
      };
      expect(() =>
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        ),
      ).not.toErrorDev(); // if `h1` is skipped, there will be no error.
    });

    it('vars are merged from all colorSchemes regardless of selected color scheme', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: {
            light: {
              palette: {
                primary: '#000',
              },
            },
            dark: {
              palette: {
                grey: '#888',
              },
            },
          },
        },
        defaultColorScheme: 'light',
      });
      const Consumer = () => {
        const theme = useTheme();
        return (
          <div>
            <div>{theme.vars.palette.primary || ''}</div>
            <div>{theme.vars.palette.grey || ''}</div>
          </div>
        );
      };
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );
      expect(screen.getByText('var(--palette-primary)')).not.to.equal(null);
      expect(screen.getByText('var(--palette-grey)')).not.to.equal(null);
    });

    describe('[option]: `enableColorScheme`', () => {
      it('set `color-scheme` property on <html> with correct mode, given `enableColorScheme` is true and `mode` is `light` or `dark`', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: {
            colorSchemes: { light: {}, dark: {} },
          },
          defaultColorScheme: 'light',
          enableColorScheme: true,
        });
        const Consumer = () => {
          const { setMode } = useColorScheme();
          return <button onClick={() => setMode('dark')}>change to dark</button>;
        };
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );
        expect(document.documentElement).toHaveComputedStyle({
          colorScheme: shouldSupportColorScheme ? 'light' : '',
        });

        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

        expect(document.documentElement).toHaveComputedStyle({
          colorScheme: shouldSupportColorScheme ? 'dark' : '',
        });
      });

      it('set `color-scheme` property on <html> with correct mode, given `enableColorScheme` is true and mode is `system`', () => {
        window.matchMedia = createMatchMedia(true); // system matches 'prefers-color-scheme: dark'

        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: {
            colorSchemes: { light: {}, dark: {} },
          },
          defaultColorScheme: 'light',
          enableColorScheme: true,
        });
        const Consumer = () => {
          const { setMode } = useColorScheme();
          return <button onClick={() => setMode('system')}>change to system</button>;
        };
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );
        expect(document.documentElement).toHaveComputedStyle({
          colorScheme: shouldSupportColorScheme ? 'light' : '',
        });

        fireEvent.click(screen.getByRole('button', { name: 'change to system' }));

        expect(document.documentElement).toHaveComputedStyle({
          colorScheme: shouldSupportColorScheme ? 'dark' : '',
        });
      });

      it('does not set `color-scheme` property on <html> with correct mode, given`enableColorScheme` is false', () => {
        const currentColorScheme = window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('color-scheme');
        const { CssVarsProvider } = createCssVarsProvider({
          theme: {
            colorSchemes: { light: {}, dark: {} },
          },
          defaultColorScheme: 'light',
          enableColorScheme: false,
        });
        const Consumer = () => <div />;

        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );
        expect(document.documentElement).toHaveComputedStyle({
          colorScheme: shouldSupportColorScheme ? currentColorScheme : '',
        });
      });

      it('cleans up `color-scheme` property on <html>, given`enableColorScheme` is true', () => {
        const previousColorScheme = window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('color-scheme');
        const { CssVarsProvider } = createCssVarsProvider({
          theme: {
            colorSchemes: { light: {}, dark: {} },
          },
          defaultColorScheme: 'light',
          enableColorScheme: true,
        });
        const { unmount } = render(<CssVarsProvider />);

        unmount();

        expect(document.documentElement).toHaveComputedStyle({
          colorScheme: previousColorScheme,
        });
      });
    });

    describe('[option]: `disableTransitionOnChange`', () => {
      clock.withFakeTimers();
      it('disable all css transitions when switching bewteen modes, given `disableTransitionOnChange` is true', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: {
            colorSchemes: { light: {}, dark: {} },
          },
          defaultColorScheme: {
            light: 'light',
            dark: 'dark',
          },
          disableTransitionOnChange: true,
        });
        const Consumer = () => {
          const { mode, setMode } = useColorScheme();
          return (
            <div>
              <div data-testid="current-mode">{mode}</div>
              <button onClick={() => setMode('dark')}>change to dark</button>;
            </div>
          );
        };
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );

        expect(document.head.children[document.head.children.length - 1].textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        expect(document.head.children[document.head.children.length - 1].textContent).to.equal(
          DISABLE_CSS_TRANSITION,
        );
        expect(screen.getByTestId('current-mode').textContent).to.equal('dark');

        clock.runToLast();
        expect(document.head.children[document.head.children.length - 1].textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
      });

      it('disable all css transitions when switching bewteen color schemes, given `disableTransitionOnChange` is true', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: {
            colorSchemes: { light: {}, dark: {} },
          },
          defaultColorScheme: {
            light: 'light',
            dark: 'dark',
          },
          disableTransitionOnChange: true,
        });
        const Consumer = () => {
          const { colorScheme, setColorScheme } = useColorScheme();
          return (
            <div>
              <div data-testid="current-color-scheme">{colorScheme}</div>
              <button onClick={() => setColorScheme('dark')}>change to dark</button>;
            </div>
          );
        };
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );

        expect(document.head.children[document.head.children.length - 1].textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        expect(document.head.children[document.head.children.length - 1].textContent).to.equal(
          DISABLE_CSS_TRANSITION,
        );
        expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');

        clock.runToLast();
        expect(document.head.children[document.head.children.length - 1].textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
      });

      it('do not disable all css transitions when switching bewteen modes, given `disableTransitionOnChange` is false', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: {
            colorSchemes: { light: {}, dark: {} },
          },
          defaultColorScheme: 'light',
          disableTransitionOnChange: false,
        });
        const Consumer = () => {
          const { mode, setMode } = useColorScheme();
          return (
            <div>
              <div data-testid="current-mode">{mode}</div>
              <button onClick={() => setMode('dark')}>change to dark</button>;
            </div>
          );
        };
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );

        expect(document.head.children[document.head.children.length - 1].textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        expect(document.head.children[document.head.children.length - 1].textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
      });

      it('do not disable all css transitions when switching bewteen color schemes, given `disableTransitionOnChange` is false', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: {
            colorSchemes: { light: {}, dark: {} },
          },
          defaultColorScheme: 'light',
          disableTransitionOnChange: false,
        });
        const Consumer = () => {
          const { colorScheme, setColorScheme } = useColorScheme();
          return (
            <div>
              <div data-testid="current-color-scheme">{colorScheme}</div>
              <button onClick={() => setColorScheme('dark')}>change to dark</button>;
            </div>
          );
        };
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );

        expect(document.head.children[document.head.children.length - 1].textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        expect(document.head.children[document.head.children.length - 1].textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
      });
    });
  });

  describe('DOM', () => {
    it('attach default dataset on html', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });
      render(<CssVarsProvider />);

      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('light');
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

      expect(document.documentElement.getAttribute('data-foo-bar')).to.equal('light');
    });

    it('does not crash if documentNode is null', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });

      expect(() => render(<CssVarsProvider documentNode={null} />)).not.to.throw();
    });

    it('does not crash if colorSchemeNode is null', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });

      expect(() => render(<CssVarsProvider colorSchemeNode={null} />)).not.to.throw();
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
      const { mode, setMode } = useColorScheme();
      return (
        <div>
          <div data-testid="current-mode">{mode}</div>
          <button onClick={() => setMode('dark')}>change to dark</button>
        </div>
      );
    };
    it('should save mode to localStorage', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(global.localStorage.setItem.calledWith(DEFAULT_MODE_STORAGE_KEY, 'light')).to.equal(
        true,
      );

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(global.localStorage.setItem.calledWith(DEFAULT_MODE_STORAGE_KEY, 'dark')).to.equal(
        true,
      );
    });

    it('should use mode from localStorage if exists', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';

      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
    });

    it('use custom modeStorageKey', () => {
      const customModeStorageKey = 'foo-mode';
      storage[customModeStorageKey] = 'dark';

      render(
        <CssVarsProvider modeStorageKey={customModeStorageKey}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
      expect(global.localStorage.setItem.calledWith(customModeStorageKey, 'dark')).to.equal(true);
    });

    it('support custom storage window', () => {
      const storageWindow = {
        addEventListener: (key, handler) => {
          if (key === 'storage') {
            handler({ key: DEFAULT_MODE_STORAGE_KEY, newValue: 'dark' });
          }
        },
        removeEventListener: () => {},
      };
      render(
        <CssVarsProvider storageWindow={storageWindow}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode')).to.have.text('dark');
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
      storage[DEFAULT_MODE_STORAGE_KEY] = 'unknown';

      render(
        <CssVarsProvider>
          <Color />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('color').textContent).to.equal('var(--color)');
    });
  });

  describe('[Application] Customization', () => {
    it('custom theme replace the default theme', () => {
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

      expect(screen.getByTestId('text-md').textContent).to.equal('');
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
        <CssVarsProvider
          theme={{ colorSchemes: { light: { palette: { color: '#000000', bgcolor: '#ffffff' } } } }}
        >
          <Swatch />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('swatch-color').textContent).to.equal('var(--palette-color)');
      expect(screen.getByTestId('swatch-bgcolor').textContent).to.equal('var(--palette-bgcolor)');
    });

    /**
     * `colorSchemes` are useful for creating toggle UI.
     * In some cases, developers might want to use the color defined in colorSchemes.
     */
    it('All `colorSchemes` is available in theme', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: {
            light: {},
            dark: {},
          },
        },
        defaultColorScheme: 'light',
      });
      const Consumer = () => {
        const theme = useTheme();
        return <div>{Object.keys(theme.colorSchemes).join(', ')}</div>;
      };
      const { container } = render(
        <CssVarsProvider theme={{ colorSchemes: { light: {}, dark: {}, dim: {} } }}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild.textContent).to.equal('light, dark, dim');
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

    it('does not take `theme.components` into account', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: { fontSize: 16 } },
          components: 'any',
        },
        defaultColorScheme: 'light',
      });
      const Text = () => {
        const theme = useTheme();

        return <div data-testid={`text`}>{theme.vars.components}</div>;
      };
      render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text').textContent).not.to.equal('var(--components)');
    });

    it('`defaultMode` is specified', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {}, dark: {} },
        },
        defaultColorScheme: 'light',
      });
      const Text = () => {
        const { mode } = useColorScheme();
        return <div>{mode}</div>;
      };
      const { container } = render(
        <CssVarsProvider defaultMode="dark">
          <Text />
        </CssVarsProvider>,
      );
      expect(container.firstChild.textContent).to.equal('dark');
    });

    it('`defaultColorScheme` is specified as string', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });
      const Text = () => {
        const { colorScheme } = useColorScheme();
        return <div>{colorScheme}</div>;
      };
      const { container } = render(
        <CssVarsProvider theme={{ colorSchemes: { paper: {} } }} defaultColorScheme="paper">
          <Text />
        </CssVarsProvider>,
      );
      expect(container.firstChild.textContent).to.equal('paper');
    });

    it('`defaultColorScheme` is specified as object', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: {
          colorSchemes: { light: {} },
        },
        defaultColorScheme: 'light',
      });
      const Text = () => {
        const { colorScheme } = useColorScheme();
        return <div>{colorScheme}</div>;
      };
      const { container } = render(
        <CssVarsProvider
          theme={{ colorSchemes: { paper: {} } }}
          defaultColorScheme={{ light: 'paper' }}
        >
          <Text />
        </CssVarsProvider>,
      );
      expect(container.firstChild.textContent).to.equal('paper');
    });
  });
});
