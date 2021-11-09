import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { ThemeProvider, useTheme } from '@mui/joy/styles';
import defaultTheme from './defaultTheme';

describe('[Joy] ThemeProvider', () => {
  const { render } = createRenderer();
  it('can render component without ThemeProvider', () => {
    const Text = () => {
      const theme = useTheme();
      return <div>{theme.fontSize.md}</div>;
    };

    const { container } = render(<Text />);

    expect(container.firstChild?.textContent).to.equal(defaultTheme.fontSize.md);
  });

  it('merge custom theme and apply to vars', () => {
    const Text = () => {
      const theme = useTheme();
      return <div>{theme.vars.fontSize.md}</div>;
    };
    const { container } = render(
      <ThemeProvider theme={{ fontSize: { md: '100rem' } }}>
        <Text />
      </ThemeProvider>,
    );

    expect(container.firstChild?.textContent).to.equal('100rem');
  });
});
