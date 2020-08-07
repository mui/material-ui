/* eslint-disable react/prefer-stateless-function */
import { expect } from 'chai';
import * as PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import elementAcceptingRef from './elementAcceptingRef';

describe('elementAcceptingRef', () => {
  function checkPropType(element, required = false) {
    PropTypes.checkPropTypes(
      { children: required ? elementAcceptingRef.isRequired : elementAcceptingRef },
      { children: element },
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

  describe('acceptance when not required', () => {
    let rootNode;

    function assertPass(element, options = {}) {
      const { failsOnMount = false, shouldMount = true } = options;

      checkPropType(element);
      if (shouldMount) {
        ReactDOM.render(
          <React.Suspense fallback={<p />}>
            {React.cloneElement(element, { ref: React.createRef() })}
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
      assertPass(<div />);
    });

    it('class components', () => {
      class Component extends React.Component {
        render() {
          return null;
        }
      }

      assertPass(<Component />);
    });

    it('accepts pure class components', () => {
      class Component extends React.PureComponent {
        render() {
          return null;
        }
      }

      assertPass(<Component />);
    });

    it('accepts forwardRef', () => {
      const Component = React.forwardRef(() => null);

      assertPass(<Component />);
    });

    it('accepts memo', () => {
      const Component = React.memo('div');

      assertPass(<Component />);
    });

    it('accepts lazy', () => {
      const Component = React.lazy(() =>
        Promise.resolve({ default: (props) => <div {...props} /> }),
      );

      // should actually fail when mounting since the ref is forwarded to a function component
      // but since this happens in a promise our consoleErrorMock doesn't catch it properly
      assertPass(<Component />);
    });

    it('technically allows other exotics like strict mode', () => {
      assertPass(<React.StrictMode />);
    });

    // undesired behavior
    it('accepts Fragment', () => {
      assertPass(<React.Fragment />);
    });
  });

  describe('rejections', () => {
    function assertFail(Component, hint) {
      checkPropType(Component);

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Invalid props `children` supplied to `DummyComponent`. ' +
          `Expected an element that can hold a ref. ${hint}`,
      );
    }

    it('rejects undefined values when required', () => {
      checkPropType(undefined, true);
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include('marked as required');
    });

    it('rejects null values when required', () => {
      checkPropType(null, true);
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include('marked as required');
    });

    it('rejects function components', () => {
      const Component = () => null;

      assertFail(
        <Component />,
        'Did you accidentally use a plain function component for an element instead?',
      );
    });
  });
});
