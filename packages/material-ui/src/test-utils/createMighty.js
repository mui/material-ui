import React from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { mount as enzymeMount } from 'enzyme';
import * as mocha from 'mocha';
import { StylesProvider } from '@material-ui/styles';

function generateStableClassName() {
  console.log(1);
  return 'foo';
}

/**
 * Can't just mount <React.Fragment>{node}</React.Fragment>
 * because that swallows wrapper.setProps
 *
 * why class component:
 * https://github.com/airbnb/enzyme/issues/2043
 */
// eslint-disable-next-line react/prefer-stateless-function
class TestCase extends React.Component {
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
    const { __element, __strict, ...other } = this.props;
    const Component = __strict ? React.StrictMode : React.Fragment;

    return (
      <StylesProvider generateClassName={generateStableClassName}>
        <Component>{React.cloneElement(__element, other)}</Component>
      </StylesProvider>
    );
  }
}

// Generate an enhanced mount function.
export default function createMount(options = {}) {
  const {
    mount = enzymeMount,
    strict: globalStrict,
    beforeAll = mocha.before,
    afterAll = mocha.after,
    beforeEach = mocha.beforeEach,
    afterEach = mocha.afterEach,
    ...globalEnzymeOptions
  } = options;

  let attachTo;

  function cleanUp() {
    try {
      ReactDOM.unmountComponentAtNode(attachTo);
    } catch (err) {
      //
    }
  }

  beforeAll(() => {
    attachTo = window.document.createElement('div');
    attachTo.className = 'app';
    attachTo.setAttribute('id', 'app');
    window.document.body.insertBefore(attachTo, window.document.body.firstChild);
  });

  afterAll(() => {
    cleanUp();
    attachTo.parentNode.removeChild(attachTo);
  });

  function mighty(node, localOptions = {}) {
    const { disableUnnmount = false, strict = globalStrict, ...localEnzymeOptions } = localOptions;

    if (!disableUnnmount) {
      ReactDOM.unmountComponentAtNode(attachTo);
    }

    // some tests require that no other components are in the tree
    // e.g. when doing .instance(), .state() etc.
    return mount(<TestCase __element={node} __strict={strict} />, {
      attachTo,
      ...globalEnzymeOptions,
      ...localEnzymeOptions,
    });
  }

  mighty.attachTo = attachTo;

  return mighty;
}
