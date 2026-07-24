import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme, useColorScheme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DemoComponentTheme, DemoInstanceThemeProvider } from './DemoThemeProviders';

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

function ThemeProbe({ testId }: { testId: string }) {
  const theme = useTheme() as ReturnType<typeof useTheme> & { injectedValue?: string };
  return <div data-testid={testId}>{theme.injectedValue ?? 'base'}</div>;
}

function IsolatedProbe() {
  return <div>isolated</div>;
}

const outerTheme = createTheme();

describe('docs demo theming', () => {
  const { render } = createRenderer();

  it('should inherit the theme.palette.mode from upper theme', () => {
    render(
      <UpperProvider>
        <DemoInstanceThemeProvider runtimeTheme={undefined}>
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

  it('loads and caches the runtime theme bridge after exposing React and jsx', async () => {
    let callCount = 0;
    const getInjectTheme = () => {
      callCount += 1;
      return () => ({ injectedValue: 'injected' });
    };
    const runtimeWindow = window as typeof window & {
      React?: typeof React;
      jsx?: typeof import('react/jsx-runtime');
      getInjectTheme?: typeof getInjectTheme;
    };
    runtimeWindow.getInjectTheme = getInjectTheme;

    render(
      <ThemeProvider theme={outerTheme}>
        <React.Fragment>
          <DemoComponentTheme name="first">
            <ThemeProbe testId="first" />
          </DemoComponentTheme>
          <DemoComponentTheme name="second">
            <ThemeProbe testId="second" />
          </DemoComponentTheme>
        </React.Fragment>
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('first')).to.have.text('injected'));
    expect(screen.getByTestId('second')).to.have.text('injected');
    expect(callCount).to.equal(1);
    expect(runtimeWindow.React?.createElement).to.equal(React.createElement);
    expect(runtimeWindow.jsx?.jsx).to.be.a('function');
    delete runtimeWindow.getInjectTheme;
  });

  it('does not mutate the base theme when merging a runtime theme', () => {
    render(
      <ThemeProvider theme={outerTheme}>
        <React.Fragment>
          <DemoInstanceThemeProvider runtimeTheme={{ injectedValue: 'injected' }}>
            <ThemeProbe testId="injected" />
          </DemoInstanceThemeProvider>
          <DemoInstanceThemeProvider runtimeTheme={undefined}>
            <ThemeProbe testId="base" />
          </DemoInstanceThemeProvider>
        </React.Fragment>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('injected')).to.have.text('injected');
    expect(screen.getByTestId('base')).to.have.text('base');
  });

  it('ignores an invalid runtime theme bridge result', async () => {
    const runtimeWindow = window as typeof window & { getInjectTheme?: () => object };
    runtimeWindow.getInjectTheme = () => ({});

    render(
      <ThemeProvider theme={outerTheme}>
        <DemoComponentTheme name="invalid">
          <ThemeProbe testId="invalid" />
        </DemoComponentTheme>
      </ThemeProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('invalid')).to.have.text('base'));
    delete runtimeWindow.getInjectTheme;
  });

  it('does not call the runtime theme bridge for isolated demos', async () => {
    let callCount = 0;
    const getInjectTheme = () => {
      callCount += 1;
      return () => ({ injectedValue: 'injected' });
    };
    const runtimeWindow = window as typeof window & { getInjectTheme?: typeof getInjectTheme };
    runtimeWindow.getInjectTheme = getInjectTheme;

    render(
      <ThemeProvider theme={outerTheme}>
        <DemoComponentTheme name="isolated" isolated>
          <IsolatedProbe />
        </DemoComponentTheme>
      </ThemeProvider>,
    );

    await Promise.resolve();
    expect(callCount).to.equal(0);
    delete runtimeWindow.getInjectTheme;
  });
});
