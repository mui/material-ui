/* eslint-disable react/prefer-stateless-function */
import { assert } from 'chai';
import * as PropTypes from 'prop-types';
import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import elementTypeAcceptingRef from './elementTypeAcceptingRef';

describe('elementTypeAcceptingRef', () => {
  let mount;

  function checkPropType(elementType) {
    PropTypes.checkPropTypes(
      { component: elementTypeAcceptingRef },
      { component: elementType },
      'props',
      'DummyComponent',
    );
  }

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
    PropTypes.resetWarningCache();
  });

  describe('acceptance', () => {
    function assertPass(Component, options = {}) {
      const { failsOnMount = false, shouldMount = true } = options;

      checkPropType(Component);
      if (shouldMount) {
        mount(<Component ref={React.createRef()} />);
      }

      assert.strictEqual(
        consoleErrorMock.callCount(),
        failsOnMount ? 1 : 0,
        `but got '${consoleErrorMock.args()[0]}'`,
      );
    }

    it('accepts nully values', () => {
      assertPass(undefined, { shouldMount: false });
      assertPass(null, { shouldMount: false });
    });

    it('accepts host components', () => {
      assertPass('div');
    });

    it('class components', () => {
      class Component extends React.Component {
        render() {
          return null;
        }
      }

      assertPass(Component);
    });

    it('accepts pure class components', () => {
      class Component extends React.PureComponent {
        render() {
          return null;
        }
      }

      assertPass(Component);
    });

    it('accepts forwardRef', () => {
      const Component = React.forwardRef(() => null);

      assertPass(Component);
    });

    it('technically allows other exotics like strict mode', () => {
      assertPass(React.StrictMode);
    });

    // undesired behavior
    it('accepts Fragment', () => {
      assertPass(React.Fragment, { failsOnMount: true });
    });
  });

  describe('rejections', () => {
    function assertFail(Component, hint) {
      checkPropType(Component);

      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'Invalid props `component` supplied to `DummyComponent`. ' +
          `Expected an element type that can hold a ref. ${hint}`,
      );
    }

    it('rejects function components', () => {
      const Component = () => null;

      assertFail(Component, 'Did you accidentally provide a plain function component instead?');
    });

    it('rejects memo', () => {
      const Component = React.memo(() => React.createElement('div'));

      // use actual hint once we don't have to mock React.useMemo
      assertFail(Component, 'Did you accidentally provide a plain function component instead?');
      // assertFail(Component, 'But you passed a React.memo component.');
    });

    it('rejects lazy', () => {
      const Component = React.lazy(() => Promise.resolve({ default: () => null }));

      assertFail(Component, 'But you passed a React.lazy component.');
    });
  });
});
