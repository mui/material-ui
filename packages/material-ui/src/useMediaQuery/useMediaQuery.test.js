import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createMount } from '@material-ui/core/test-utils';
import mediaQuery from 'css-mediaquery';
import { assert } from 'chai';
import { spy } from 'sinon';
import useMediaQuery, { testReset } from './useMediaQuery';

function createMatchMedia(width, listeners) {
  return query => ({
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
  });
}

describe('useMediaQuery', () => {
  const listeners = [];
  let mount;
  let values;

  // Only run the test on node.
  // Waiting for https://github.com/facebook/react/issues/14050
  if (!/jsdom/.test(window.navigator.userAgent)) {
    return;
  }

  before(() => {
    mount = createMount();
  });

  beforeEach(() => {
    testReset();
    values = spy();
    window.matchMedia = createMatchMedia(1200, listeners);
  });

  after(() => {
    mount.cleanUp();
  });

  describe('option: defaultMatches', () => {
    it('should be false by default', () => {
      const Test = () => {
        const matches = useMediaQuery('(min-width:2000px)');
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 1);
    });

    it('should take the option into account', () => {
      const Test = () => {
        const matches = useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
        });
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 2);
    });
  });

  describe('option: noSsr', () => {
    it('should render once if the default value match the expectation', () => {
      const Test = () => {
        const matches = useMediaQuery('(min-width:2000px)', {
          defaultMatches: false,
        });
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 1);
    });

    it('should render twice if the default value does not match the expectation', () => {
      const Test = () => {
        const matches = useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
        });
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 2);
    });

    it('should render once if the default value does not match the expectation', () => {
      const Test = () => {
        const matches = useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
          noSsr: true,
        });
        values(matches);
        return <span>{`${matches}`}</span>;
      };

      const wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 1);
    });
  });

  it('should try to reconcile only the first time', done => {
    const Test = () => {
      const matches = useMediaQuery('(min-width:2000px)', {
        defaultMatches: true,
      });
      values(matches);
      return <span>{`${matches}`}</span>;
    };

    let wrapper = mount(<Test />);
    assert.strictEqual(wrapper.text(), 'false');
    assert.strictEqual(values.callCount, 2);
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(mount.attachTo);
      wrapper = mount(<Test />);
      assert.strictEqual(wrapper.text(), 'false');
      assert.strictEqual(values.callCount, 3);

      setTimeout(() => {
        assert.strictEqual(wrapper.text(), 'false');
        assert.strictEqual(values.callCount, 3);
        done();
      });
    });
  });

  it('should be able to change the query dynamically', () => {
    const Test = props => {
      const matches = useMediaQuery(props.query, {
        defaultMatches: true,
      });
      values(matches);
      return <span>{`${matches}`}</span>;
    };
    Test.propTypes = {
      query: PropTypes.string.isRequired,
    };

    const wrapper = mount(<Test query="(min-width:2000px)" />);
    assert.strictEqual(wrapper.text(), 'false');
    assert.strictEqual(values.callCount, 2);
    wrapper.setProps({ query: '(min-width:100px)' });
    assert.strictEqual(wrapper.text(), 'true');
    assert.strictEqual(values.callCount, 4);
  });

  it('should observe the media query', () => {
    const Test = props => {
      const matches = useMediaQuery(props.query);
      values(matches);
      return <span>{`${matches}`}</span>;
    };
    Test.propTypes = {
      query: PropTypes.string.isRequired,
    };

    const wrapper = mount(<Test query="(min-width:2000px)" />);
    assert.strictEqual(values.callCount, 1);
    assert.strictEqual(wrapper.text(), 'false');

    window.matchMedia = createMatchMedia(30000, listeners);
    listeners[0]({
      matches: true,
    });
    assert.strictEqual(wrapper.text(), 'true');
    assert.strictEqual(values.callCount, 2);
  });
});
