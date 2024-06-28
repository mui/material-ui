/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { createRenderer, waitFor } from '@mui/internal-test-utils';
import elementAcceptingRef from './elementAcceptingRef';

describe('elementAcceptingRef', () => {
  const { render } = createRenderer();

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
    async function assertPass(element: any, { shouldMount = true } = {}) {
      function testAct() {
        checkPropType(element);
        if (shouldMount) {
          render(
            <React.Suspense fallback={<p />}>
              {React.cloneElement(element, { ref: React.createRef() })}
            </React.Suspense>,
          );
        }
      }

      await waitFor(() => {
        expect(testAct).not.toErrorDev();
      });
    }

    it('accepts nully values', async () => {
      await assertPass(undefined, { shouldMount: false });
      await assertPass(null, { shouldMount: false });
    });

    it('accepts host components', async () => {
      await assertPass(<div />);
    });

    it('class components', async () => {
      class Component extends React.Component {
        render() {
          return null;
        }
      }

      await assertPass(<Component />);
    });

    it('accepts pure class components', async () => {
      class Component extends React.PureComponent {
        render() {
          return null;
        }
      }

      await assertPass(<Component />);
    });

    it('accepts forwardRef', async () => {
      const Component = React.forwardRef(() => null);

      await assertPass(<Component />);
    });

    it('accepts memo', async () => {
      const Component = React.memo(React.forwardRef(() => null));

      await assertPass(<Component />);
    });

    it('accepts lazy', async () => {
      const Component = React.lazy(() =>
        Promise.resolve({
          default: React.forwardRef((props, ref) => <div {...props} ref={ref} />),
        }),
      );

      await assertPass(<Component />);
    });

    it('technically allows other exotics like strict mode', async () => {
      await assertPass(<React.StrictMode />);
    });

    // undesired behavior
    it('accepts Fragment', async () => {
      // eslint-disable-next-line react/jsx-no-useless-fragment
      await assertPass(<React.Fragment />);
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
