/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import elementAcceptingRef from './elementAcceptingRef';

describe('elementAcceptingRef', () => {
  function checkPropType(element: any, required = false) {
    PropTypes.checkPropTypes(
      { children: required ? elementAcceptingRef.isRequired : elementAcceptingRef },
      { children: element },
      'props',
      'DummyComponent',
    );
  }

  beforeEach(() => {
    PropTypes.resetWarningCache();
  });

  describe('acceptance when not required', () => {
    let rootNode: HTMLElement;

    function assertPass(element: any, { shouldMount = true } = {}) {
      function testAct() {
        checkPropType(element);
        if (shouldMount) {
          ReactDOM.render(
            <React.Suspense fallback={<p />}>
              {React.cloneElement(element, { ref: React.createRef() })}
            </React.Suspense>,
            rootNode,
          );
        }
      }

      expect(testAct).not.toErrorDev();
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
      const Component = React.memo(React.forwardRef(() => null));

      assertPass(<Component />);
    });

    it('accepts lazy', () => {
      const Component = React.lazy(() =>
        Promise.resolve({
          default: React.forwardRef((props, ref) => <div {...props} ref={ref} />),
        }),
      );

      assertPass(<Component />);
    });

    it('technically allows other exotics like strict mode', () => {
      assertPass(<React.StrictMode />);
    });

    // undesired behavior
    it('accepts Fragment', () => {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      assertPass(<React.Fragment />);
    });
  });

  describe('rejections', () => {
    function assertFail(Component: any, hint: string) {
      expect(() => {
        checkPropType(Component);
      }).toErrorDev(
        'Invalid props `children` supplied to `DummyComponent`. ' +
          `Expected an element that can hold a ref. ${hint}`,
      );
    }

    it('rejects undefined values when required', () => {
      expect(() => {
        checkPropType(undefined, true);
      }).toErrorDev('marked as required');
    });

    it('rejects null values when required', () => {
      expect(() => {
        checkPropType(null, true);
      }).toErrorDev('marked as required');
    });

    it('rejects function components', () => {
      function Component() {
        return null;
      }

      assertFail(
        <Component />,
        'Did you accidentally use a plain function component for an element instead?',
      );
    });
  });
});
