import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';
import { createMount } from '@material-ui/core/test-utils';
import mediaQuery from 'css-mediaquery';
import { assert } from 'chai';
import { spy } from 'sinon';
import useMediaQuery, { testReset } from './useMediaQuery';

function createMatchMedia(width, ref) {
  const listeners = [];
  return query => {
    const instance = {
      matches: mediaQuery.match(query, {
        width,
      }),
      addListener: listener => {
        listeners.push(listener);
      },
      removeListener: listener => {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      },
    };
    ref.push({
      instance,
      listeners,
    });
    return instance;
  };
}

describe('useMediaQuery', () => {
  let matchMediaInstances;
  let mount;
  let values;

  // Only run the test on node.
  // Waiting for https://github.com/facebook/react/issues/14050
  if (!/jsdom/.test(window.navigator.userAgent)) {
    return;
  }

  before(() => {
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('without feature', () => {
    it('should work without window.matchMedia available', () => {
      assert.strictEqual(typeof window.matchMedia, 'undefined');
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = () => {
        const matches = useMediaQuery('(min-width:100px)');
        return <span ref={ref}>{`${matches}`}</span>;
      };

      mount(<Test />);
      assert.strictEqual(text(), 'false');
    });
  });

  describe('with feature', () => {
    beforeEach(() => {
      testReset();
      values = spy();
      matchMediaInstances = [];
      window.matchMedia = createMatchMedia(1200, matchMediaInstances);
    });

    describe('option: defaultMatches', () => {
      it('should be false by default', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)');
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        mount(<Test />);
        assert.strictEqual(text(), 'false');
        assert.strictEqual(values.callCount, 1);
      });

      it('should take the option into account', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        mount(<Test />);
        assert.strictEqual(text(), 'false');
        assert.strictEqual(values.callCount, 2);
      });
    });

    describe('option: noSsr', () => {
      it('should render once if the default value match the expectation', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: false,
          });
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        mount(<Test />);
        assert.strictEqual(text(), 'false');
        assert.strictEqual(values.callCount, 1);
      });

      it('should render twice if the default value does not match the expectation', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        mount(<Test />);
        assert.strictEqual(text(), 'false');
        assert.strictEqual(values.callCount, 2);
      });

      it('should render once if the default value does not match the expectation', () => {
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Test = () => {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
            noSsr: true,
          });
          React.useEffect(() => values(matches));
          return <span ref={ref}>{`${matches}`}</span>;
        };

        mount(<Test />);
        assert.strictEqual(text(), 'false');
        assert.strictEqual(values.callCount, 1);
      });
    });

    it('should try to reconcile only the first time', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = () => {
        const matches = useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
        });
        React.useEffect(() => values(matches));
        return <span ref={ref}>{`${matches}`}</span>;
      };

      mount(<Test />);
      assert.strictEqual(text(), 'false');
      assert.strictEqual(values.callCount, 2);

      ReactDOM.unmountComponentAtNode(mount.attachTo);

      mount(<Test />);
      assert.strictEqual(text(), 'false');
      assert.strictEqual(values.callCount, 3);
    });

    it('should be able to change the query dynamically', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = props => {
        const matches = useMediaQuery(props.query, {
          defaultMatches: true,
        });
        React.useEffect(() => values(matches));
        return <span ref={ref}>{`${matches}`}</span>;
      };
      Test.propTypes = {
        query: PropTypes.string.isRequired,
      };

      const wrapper = mount(<Test query="(min-width:2000px)" />);
      assert.strictEqual(text(), 'false');
      assert.strictEqual(values.callCount, 2);
      wrapper.setProps({ query: '(min-width:100px)' });
      assert.strictEqual(text(), 'true');
      assert.strictEqual(values.callCount, 4);
    });

    it('should observe the media query', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const Test = props => {
        const matches = useMediaQuery(props.query);
        React.useEffect(() => values(matches));
        return <span ref={ref}>{`${matches}`}</span>;
      };
      Test.propTypes = {
        query: PropTypes.string.isRequired,
      };

      mount(<Test query="(min-width:2000px)" />);
      assert.strictEqual(values.callCount, 1);
      assert.strictEqual(text(), 'false');

      act(() => {
        matchMediaInstances[0].instance.matches = true;
        matchMediaInstances[0].listeners[0]();
      });
      assert.strictEqual(text(), 'true');
      assert.strictEqual(values.callCount, 2);
    });
  });
});
