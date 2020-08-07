/* eslint-disable react/prefer-stateless-function */
import { expect } from 'chai';
import * as PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import elementTypeAcceptingRef from './elementTypeAcceptingRef';

describe('elementTypeAcceptingRef', () => {
  function checkPropType(elementType) {
    PropTypes.checkPropTypes(
      { component: elementTypeAcceptingRef },
      { component: elementType },
      'props',
      'DummyComponent',
    );
  }

  beforeEach(() => {
    consoleErrorMock.spy();
    PropTypes.resetWarningCache();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describe('acceptance', () => {
    let rootNode;

    function assertPass(Component, options = {}) {
      const { failsOnMount = false, shouldMount = true } = options;

      checkPropType(Component);
      if (shouldMount) {
        ReactDOM.render(
          <React.Suspense fallback={<p />}>
            <Component ref={React.createRef()} />
          </React.Suspense>,
          rootNode,
        );
      }

      expect(consoleErrorMock.callCount()).to.equal(
        failsOnMount ? 1 : 0,
        `but got '${consoleErrorMock.messages()[0]}'`,
      );
    }

    before(() => {
      rootNode = document.createElement('div');
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(rootNode);
    });

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

    it('accepts memo', () => {
      const Component = React.memo('div');

      assertPass(Component);
    });

    it('accepts lazy', () => {
      const Component = React.lazy(() =>
        Promise.resolve({ default: (props) => <div {...props} /> }),
      );

      // should actually fail when mounting since the ref is forwarded to a function component
      // but since this happens in a promise our consoleErrorMock doesn't catch it properly
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

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Invalid props `component` supplied to `DummyComponent`. ' +
          `Expected an element type that can hold a ref. ${hint}`,
      );
    }

    it('rejects function components', () => {
      const Component = () => null;

      assertFail(Component, 'Did you accidentally provide a plain function component instead?');
    });
  });
});
