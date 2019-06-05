import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createRender } from '@material-ui/core/test-utils';
import mediaQuery from 'css-mediaquery';
import { assert } from 'chai';
import { spy } from 'sinon';
import { testReset } from './useMediaQuery';
import useMediaQueryTheme from './useMediaQueryTheme';

describe('useMediaQueryTheme', () => {
  let render;
  let values;

  // Only run the test on node.
  // Waiting for https://github.com/facebook/react/issues/14050
  if (!/jsdom/.test(window.navigator.userAgent)) {
    return;
  }

  before(() => {
    render = createRender();
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
    testReset();
    values = spy();
  });

  it('should use the ssr match media ponyfill', () => {
    const containerRef = React.createRef();
    function MyComponent() {
      const matches = useMediaQueryTheme('(min-width:2000px)');
      values(matches);
      return <span ref={containerRef}>{`${matches}`}</span>;
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

    const wrapper = render(<Test />);
    assert.strictEqual(wrapper.text(), 'true');
    assert.strictEqual(values.callCount, 1);
  });
});
