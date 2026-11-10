import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { createRenderer, renderHook, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme, useColorScheme, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

describe('ThemeProvider', () => {
  const { render } = createRenderer();
  let originalMatchmedia: typeof window.matchMedia;
  let storage: Record<string, string> = {};

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // Create mocks of localStorage getItem and setItem functions
    storage = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => storage[key],
        setItem: (key: string, value: string) => {
          storage[key] = value;
        },
      },
      configurable: true,
    });
    window.matchMedia = () =>
      ({
        // Keep mocking legacy methods because @mui/material v5 still uses them
        addListener: () => {},
        addEventListener: () => {},
        removeListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList;
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  it('When theme is a function, it should not show warning', () => {
    expect(() =>
      render(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={() => ({})} />
        </ThemeProvider>,
      ),
    ).not.toWarnDev();
  });

  it('theme should be stable between renders if created outside of component', () => {
    const theme = createTheme();
    const { result, rerender } = renderHook(
      () => {
        return useTheme();
      },
      {
        wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
      },
    );
    const firstRender = result.current;
    rerender();
    const secondRender = result.current;
    expect(firstRender).to.equal(secondRender);
  });

  describe('light & dark', () => {
    function ModeSwitcher() {
      const { mode, setMode } = useColorScheme();
      if (!mode) {
        return null;
      }
      return (
        <select
          data-testid="mode-switcher"
          value={mode}
          onChange={(event) => {
            setMode(event.target.value as 'light' | 'dark' | 'system');
          }}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      );
    }

    it('should be able to use `useColorScheme`', () => {
      const theme = createTheme({
        colorSchemes: { dark: true },
      });
      expect(() =>
        render(
          <ThemeProvider theme={theme}>
            <ModeSwitcher />
          </ThemeProvider>,
        ),
      ).not.toErrorDev();
    });

    it('should be able to switch between modes', async () => {
      const theme = createTheme({
        cssVariables: { colorSchemeSelector: 'class' },
        colorSchemes: { dark: true },
      });
      const { user } = render(
        <ThemeProvider theme={theme}>
          <ModeSwitcher />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('mode-switcher')).to.have.property('value', 'system');

      await user.selectOptions(screen.getByTestId('mode-switcher'), 'dark');

      expect(screen.getByTestId('mode-switcher')).to.have.property('value', 'dark');
    });

    it('allows default mode to be changed', () => {
      const theme = createTheme({
        colorSchemes: { dark: true },
      });

      render(
        <ThemeProvider theme={theme} defaultMode="dark">
          <ModeSwitcher />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('mode-switcher')).to.have.property('value', 'dark');
    });
  });

  describe('nested ThemeProvider', () => {
    it('warns and sets `vars` to null for a nested theme without CSS theme variables', () => {
      const upperTheme = createTheme();
      // A theme object that wasn't created with `createTheme()`.
      const nestedTheme = { palette: { primary: { main: '#ff0000' } } };
      let theme: any;
      function Component() {
        theme = useTheme();
        return null;
      }
      expect(() =>
        render(
          <ThemeProvider theme={upperTheme}>
            <ThemeProvider theme={nestedTheme}>
              <Component />
            </ThemeProvider>
          </ThemeProvider>,
        ),
      ).toWarnDev('MUI: The theme passed to the `ThemeProvider` has no CSS theme variables');

      expect(theme.vars).to.equal(null);
      expect(theme.palette.primary.main).to.equal('#ff0000');
    });

    it('applies a nested theme created with `createTheme()`', () => {
      const upperTheme = createTheme();
      const nestedTheme = createTheme({ palette: { primary: { main: '#ff0000' } } });
      let theme: any;
      function Component() {
        theme = useTheme();
        return <Button>Button</Button>;
      }
      render(
        <ThemeProvider theme={upperTheme}>
          <ThemeProvider theme={nestedTheme}>
            <Component />
          </ThemeProvider>
        </ThemeProvider>,
      );

      expect(theme.vars).not.to.equal(null);
      expect(theme.palette.primary.main).to.equal('#ff0000');
    });
  });
});
