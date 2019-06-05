import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import useTheme from './useTheme';
import ThemeProvider from '../ThemeProvider';

describe('useTheme', () => {
  let mount;

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  it('should use the theme', () => {
    const ref = React.createRef();
    const text = () => ref.current.textContent;
    function Test() {
      const theme = useTheme();

      return <span ref={ref}>{theme.foo}</span>;
    }

    mount(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    assert.strictEqual(text(), 'foo');
  });
});
