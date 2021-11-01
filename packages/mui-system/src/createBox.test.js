import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import { createBox, ThemeProvider } from '@mui/system';

describe('createBox', () => {
  const render = createClientRender();

  it('should work', () => {
    const Box = createBox();

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('MuiBox-root');
  });

  it('should use defaultTheme if provided', () => {
    const Box = createBox({ defaultTheme: { palette: { primary: { main: 'rgb(255, 0, 0)' } } } });

    const { container } = render(<Box color="primary.main">Content</Box>);
    expect(container.firstChild).toHaveComputedStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('should use theme from Context if provided', () => {
    const Box = createBox({ defaultTheme: { palette: { primary: { main: 'rgb(255, 0, 0)' } } } });

    const { container } = render(
      <ThemeProvider theme={{ palette: { primary: { main: 'rgb(0, 255, 0)' } } }}>
        <Box color="primary.main">Content</Box>
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ color: 'rgb(0, 255, 0)' });
  });

  it('able to customize default className', () => {
    const Box = createBox({ defaultClassName: 'FooBarBox' });

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('FooBarBox');
  });

  it('use generateClassName if provided', () => {
    const Box = createBox({ generateClassName: () => 'CustomBox-root' });

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('CustomBox-root');
  });

  it('generateClassName should receive defaultClassName if provided', () => {
    const Box = createBox({
      defaultClassName: 'FooBarBox',
      generateClassName: (name) => name.replace('FooBar', ''),
    });

    const { container } = render(<Box />);
    expect(container.firstChild).to.have.class('Box');
  });
});
