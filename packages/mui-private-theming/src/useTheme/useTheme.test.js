import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import useTheme from './useTheme';
import ThemeProvider from '../ThemeProvider';

describe('useTheme', () => {
  const { render } = createRenderer();

  it('should use the theme', () => {
    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = useTheme();

      return <span ref={ref}>{theme.foo}</span>;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(text()).to.equal('foo');
  });
});
