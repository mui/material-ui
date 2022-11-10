/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import elementTypeAcceptingRef from './elementTypeAcceptingRef';

describe('elementTypeAcceptingRef', () => {
  function checkPropType(elementType: any) {
    PropTypes.checkPropTypes(
      { component: elementTypeAcceptingRef },
      { component: elementType },
      'props',
      'DummyComponent',
    );
  }

  beforeEach(() => {
    PropTypes.resetWarningCache();
  });

  describe('acceptance', () => {
    let rootNode: HTMLElement;

    function assertPass(Component: any, { failsOnMount = false, shouldMount = true } = {}) {
      function testAct() {
        checkPropType(Component);
        if (shouldMount) {
          ReactDOM.render(
            <React.Suspense fallback={<p />}>
              <Component ref={React.createRef()} />
            </React.Suspense>,
            rootNode,
          );
        }
      }

      if (failsOnMount) {
        expect(testAct).toErrorDev('');
      } else {
        expect(testAct).not.toErrorDev();
      }
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
      const Component = React.memo(React.forwardRef(() => null));

      assertPass(Component);
    });

    it('accepts lazy', () => {
      const Component = React.lazy(() =>
        Promise.resolve({
          default: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
        }),
      );

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
    function assertFail(Component: any, hint: string) {
      expect(() => {
        checkPropType(Component);
      }).toErrorDev(
        'Invalid props `component` supplied to `DummyComponent`. ' +
          `Expected an element type that can hold a ref. ${hint}`,
      );
    }

    it('rejects function components', () => {
      function Component() {
        return null;
      }

      assertFail(Component, 'Did you accidentally provide a plain function component instead?');
    });
  });
});
