import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider, useTheme } from '@mui/joy/styles';
import defaultTheme from './defaultTheme';

describe('[Joy] ThemeProvider', () => {
  const { render } = createRenderer();

  it('can render component without ThemeProvider', () => {
    function Text() {
      const theme = useTheme();
      return <div>{theme.fontSize.md}</div>;
    }

    const { container } = render(<Text />);

    expect(container.firstChild?.textContent).to.equal(defaultTheme.fontSize.md);
  });

  it('merge custom theme and apply to vars', () => {
    function Text() {
      const theme = useTheme();
      return <div>{theme.vars.fontSize.md}</div>;
    }
    const { container } = render(
      <ThemeProvider theme={{ fontSize: { md: '100rem' } }}>
        <Text />
      </ThemeProvider>,
    );

    expect(container.firstChild?.textContent).to.equal('var(--joy-fontSize-md, 100rem)');
  });
});
