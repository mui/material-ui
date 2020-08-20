/* eslint-env mocha */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMTestUtils from 'react-dom/test-utils';
import * as PropTypes from 'prop-types';
import { mount as enzymeMount } from 'enzyme';

/**
 * Can't just mount <React.Fragment>{node}</React.Fragment>
 * because that swallows wrapper.setProps
 *
 * why class component:
 * https://github.com/airbnb/enzyme/issues/2043
 */
// eslint-disable-next-line react/prefer-stateless-function
class Mode extends React.Component {
  static propTypes = {
    /**
     * this is essentially children. However we can't use children because then
     * using `wrapper.setProps({ children })` would work differently if this component
     * would be the root.
     */
    __element: PropTypes.element.isRequired,
    __strict: PropTypes.bool.isRequired,
  };

  render() {
    // Excess props will come from e.g. enzyme setProps
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { __element, __strict, ...other } = this.props;
    const Component = __strict ? React.StrictMode : React.Fragment;

    return <Component>{React.cloneElement(__element, other)}</Component>;
  }
}

// Generate an enhanced mount function.
export default function createMount(options = {}) {
  const { mount = enzymeMount, strict: globalStrict = true, ...globalEnzymeOptions } = options;

  let container = null;

  /**
   * @param {import('mocha').Test | undefined} test
   */
  function computeTestName(test) {
    /**
     * @type {import('mocha').Test | import('mocha').Suite | undefined}
     */
    let current = test;
    const titles = [];
    while (current != null) {
      titles.push(current.title);
      current = current.parent;
    }

    return titles.filter(Boolean).reverse().join(' -> ');
  }

  beforeEach(function beforeEachMountTest() {
    container = document.createElement('div');
    container.setAttribute('data-test', computeTestName(this.currentTest));
    document.body.insertBefore(container, document.body.firstChild);
  });

  afterEach(() => {
    ReactDOMTestUtils.act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });
    container.parentElement.removeChild(container);
    container = null;
  });

  const mountWithContext = function mountWithContext(node, localOptions = {}) {
    const { strict = globalStrict, ...localEnzymeOptions } = localOptions;

    if (container === null) {
      throw new Error(
        `Tried to mount without setup. Mounting inside before() is not allowed. Try mounting in beforeEach or better: in each test`,
      );
    }
    ReactDOMTestUtils.act(() => {
      ReactDOM.unmountComponentAtNode(container);
    });

    // some tests require that no other components are in the tree
    // e.g. when doing .instance(), .state() etc.
    const wrapper = mount(
      strict == null ? node : <Mode __element={node} __strict={Boolean(strict)} />,
      {
        attachTo: container,
        ...globalEnzymeOptions,
        ...localEnzymeOptions,
      },
    );
    const originalUnmount = wrapper.unmount;
    wrapper.unmount = () => {
      // flush effect cleanup functions
      ReactDOMTestUtils.act(() => {
        originalUnmount.call(wrapper);
      });
    };

    return wrapper;
  };

  return mountWithContext;
}
