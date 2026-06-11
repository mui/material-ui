import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import { DemoContainer } from './DemoContainer';

// Stand-in demo that records the isolation props injected by `IsolatedDemo` via
// `React.cloneElement`. The real demos forward these to `CssVarsProvider`, which
// needs them to attach the `light`/`dark` class to the right node.
function ProbeDemo(props: {
  colorSchemeNode?: Element | null;
  colorSchemeSelector?: string;
  cssVarPrefix?: string;
}) {
  return (
    <div
      data-testid="probe"
      data-has-color-scheme-node={props.colorSchemeNode != null ? 'yes' : 'no'}
      data-color-scheme-selector={props.colorSchemeSelector ?? ''}
      data-css-var-prefix={props.cssVarPrefix ?? ''}
    />
  );
}

describe('DemoContainer', () => {
  const { render } = createRenderer();

  // Regression: the error boundary used to sit between `DemoComponentTheme` and
  // the demo, so the `cloneElement` that injects the isolation props targeted the
  // error boundary (which renders `children` verbatim) and the demo never saw
  // them. The boundary now wraps `DemoComponentTheme` from the outside so the
  // clone reaches the demo element directly.
  it('forwards isolation props to the demo, not the error boundary, when isolated', () => {
    render(
      // `DemoContainer` reads `useTranslate()` (for the initial-focus button's
      // `aria-label`), so it needs a language in scope — the app provides one via
      // `AppFrame`; supply it here so the lookup resolves instead of warning.
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContainer name="probe-demo" isolated preview={<ProbeDemo />} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    const probe = screen.getByTestId('probe');
    expect(probe.getAttribute('data-color-scheme-selector')).to.equal('class');
    expect(probe.getAttribute('data-css-var-prefix')).to.equal('probe-demo');
    // `colorSchemeNode` is wired through the `<div ref>` wrapper after its ref
    // resolves and the component re-renders.
    expect(probe.getAttribute('data-has-color-scheme-node')).to.equal('yes');
  });
});
