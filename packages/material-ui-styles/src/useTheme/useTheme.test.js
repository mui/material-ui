import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import useTheme from './useTheme';
import ThemeProvider from '../ThemeProvider';

describe('useTheme', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should use the theme', () => {
    function Test() {
      const theme = useTheme();

      return <span>{theme.foo}</span>;
    }

    const wrapper = mount(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    assert.strictEqual(wrapper.text(), 'foo');
  });
});
