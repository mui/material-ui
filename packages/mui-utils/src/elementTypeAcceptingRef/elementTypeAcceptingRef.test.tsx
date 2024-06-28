/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { createRenderer, waitFor } from '@mui/internal-test-utils';
import elementTypeAcceptingRef from './elementTypeAcceptingRef';

describe('elementTypeAcceptingRef', () => {
  const { render } = createRenderer();

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
    async function assertPass(Component: any, { failsOnMount = false, shouldMount = true } = {}) {
      function testAct() {
        checkPropType(Component);
        if (shouldMount) {
          render(
            <React.Suspense fallback={<p />}>
              <Component ref={React.createRef()} />
            </React.Suspense>,
          );
        }
      }

      await waitFor(() => {
        if (failsOnMount) {
          expect(testAct).toErrorDev('');
        } else {
          expect(testAct).not.toErrorDev();
        }
      });
    }

    it('accepts nully values', async () => {
      await assertPass(undefined, { shouldMount: false });
      await assertPass(null, { shouldMount: false });
    });

    it('accepts host components', async () => {
      await assertPass('div');
    });

    it('class components', async () => {
      class Component extends React.Component {
        render() {
          return null;
        }
      }

      await assertPass(Component);
    });

    it('accepts pure class components', async () => {
      class Component extends React.PureComponent {
        render() {
          return null;
        }
      }

      await assertPass(Component);
    });

    it('accepts forwardRef', async () => {
      const Component = React.forwardRef(() => null);

      await assertPass(Component);
    });

    it('accepts memo', async () => {
      const Component = React.memo(React.forwardRef(() => null));

      await assertPass(Component);
    });

    it('accepts lazy', async () => {
      const Component = React.lazy(() =>
        Promise.resolve({
          default: React.forwardRef((props, ref) => <div ref={ref} {...props} />),
        }),
      );

      await assertPass(Component);
    });

    it('technically allows other exotics like strict mode', async () => {
      await assertPass(React.StrictMode);
    });

    // undesired behavior
    it('accepts Fragment', async () => {
      await assertPass(React.Fragment, { failsOnMount: true });
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
