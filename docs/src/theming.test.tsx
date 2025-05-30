import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { THEME_ID as JOY_THEME_ID, extendTheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import { DemoInstanceThemeProvider } from './theming';

function DarkMode() {
  const { mode, setMode } = useColorScheme();
  return <button onClick={() => setMode('dark')}>{mode}</button>;
}

function UpperProvider({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      storageManager={null}
      defaultMode="light"
      theme={createTheme({ colorSchemes: { light: true, dark: true } })}
    >
      <DarkMode />
      {children}
    </ThemeProvider>
  );
}

describe('docs demo theming', () => {
  const { render } = createRenderer();

  it('should inherit the theme.palette.mode from upper theme', () => {
    render(
      <UpperProvider>
        <DemoInstanceThemeProvider runtimeTheme={{ experimental_modularCssLayers: false }}>
          <Box
            data-testid="foo"
            sx={(theme) => ({
              mixBlendMode: theme.palette.mode === 'dark' ? 'darken' : 'lighten',
            })}
          />
        </DemoInstanceThemeProvider>
      </UpperProvider>,
    );

    expect(screen.getByRole('button')).to.have.text('light');
    expect(screen.getByTestId('foo')).toHaveComputedStyle({ mixBlendMode: 'lighten' });

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).to.have.text('dark');
    expect(screen.getByTestId('foo')).toHaveComputedStyle({ mixBlendMode: 'darken' });
  });

  it('able to render Joy components if upper theme of Joy UI is scoped', () => {
    const materialTheme = createTheme({ cssVariables: true });
    expect(() =>
      render(
        <ThemeProvider theme={{ ...materialTheme, [JOY_THEME_ID]: extendTheme() }}>
          <DemoInstanceThemeProvider runtimeTheme={undefined}>
            <Button>Joy</Button>
          </DemoInstanceThemeProvider>
        </ThemeProvider>,
      ),
    ).not.to.throw();
  });
});
