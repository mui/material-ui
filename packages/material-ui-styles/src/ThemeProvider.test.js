import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import useTheme from './useTheme';
import ThemeProvider from './ThemeProvider';

describe('ThemeProvider', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should provide the theme', () => {
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

  it('should merge the themes', () => {
    function Test() {
      const theme = useTheme();

      return (
        <span>
          {theme.foo}
          {theme.bar}
        </span>
      );
    }

    const wrapper = mount(
      <ThemeProvider theme={{ bar: 'bar' }}>
        <ThemeProvider theme={{ foo: 'foo' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    assert.strictEqual(wrapper.text(), 'foobar');
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn about missing provider', () => {
      mount(
        <ThemeProvider theme={theme => theme}>
          <div />
        </ThemeProvider>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(consoleErrorMock.args()[0][0], 'However, no outer theme is present.');
    });

    it('should warn about wrong theme function', () => {
      mount(
        <ThemeProvider theme={{ bar: 'bar' }}>
          <ThemeProvider theme={() => {}}>
            <div />
          </ThemeProvider>
          ,
        </ThemeProvider>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'you should return an object from your theme function',
      );
    });
  });
});
