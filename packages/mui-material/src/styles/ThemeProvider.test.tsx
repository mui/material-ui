import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';

describe('ThemeProvider', () => {
  const { render } = createRenderer();
  let originalMatchmedia: typeof window.matchMedia;
  let storage: Record<string, string> = {};

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // Create mocks of localStorage getItem and setItem functions
    storage = {};
    Object.defineProperty(global, 'localStorage', {
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
        addListener: () => {},
        removeListener: () => {},
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

    it('should be able to switch between modes', () => {
      const theme = createTheme({
        colorSchemes: { dark: true },
      });
      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <ModeSwitcher />
        </ThemeProvider>,
      );

      expect(getByTestId('mode-switcher')).to.have.property('value', 'system');

      fireEvent.change(getByTestId('mode-switcher'), { target: { value: 'dark' } });

      expect(getByTestId('mode-switcher')).to.have.property('value', 'dark');
    });
  });
});
