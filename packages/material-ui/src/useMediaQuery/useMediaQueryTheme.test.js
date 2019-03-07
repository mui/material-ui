import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMount } from '@material-ui/core/test-utils';
import mediaQuery from 'css-mediaquery';
import { assert } from 'chai';
import { spy } from 'sinon';
import { testReset } from './useMediaQuery';
import useMediaQueryTheme from './useMediaQueryTheme';

describe('useMediaQueryTheme', () => {
  let mount;
  let values;

  // Only run the test on node.
  // Waiting for https://github.com/facebook/react/issues/14050
  if (!/jsdom/.test(window.navigator.userAgent)) {
    return;
  }

  before(() => {
    mount = createMount();
    if (!window.matchMedia) {
      window.matchMedia = query => ({
        matches: mediaQuery.match(query, {
          width: 1200,
        }),
        addListener: () => {},
        removeListener: () => {},
      });
    }
  });

  beforeEach(() => {
    ReactDOM.unmountComponentAtNode(mount.attachTo);
    testReset();
    values = spy();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should use the ssr match media ponyfill', done => {
    function MyComponent() {
      const matches = useMediaQueryTheme('(min-width:2000px)');
      values(matches);
      return <span>{`${matches}`}</span>;
    }

    const Test = () => {
      const ssrMatchMedia = query => ({
        matches: mediaQuery.match(query, {
          width: 3000,
        }),
      });

      return (
        <ThemeProvider theme={{ props: { MuiUseMediaQuery: { ssrMatchMedia } } }}>
          <MyComponent />
        </ThemeProvider>
      );
    };

    const wrapper = mount(<Test />);
    assert.strictEqual(wrapper.text(), 'true');
    assert.strictEqual(values.callCount, 1);
    setTimeout(() => {
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 2);
      done();
    });
  });
});
