import React from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { mount as enzymeMount } from 'enzyme';
import * as mocha from 'mocha';
import { StylesProvider } from '@material-ui/styles';
import hash from '@emotion/hash';

function generateStableClassName(rule, styleSheet) {
  const isStatic = !styleSheet.options.link;

  let suffix = '';
  if (isStatic) {
    const themeHash = hash(JSON.stringify(styleSheet.options.theme));
    const raw = styleSheet.rules.raw[rule.key];
    suffix = hash(`${themeHash}${rule.key}${JSON.stringify(raw)}`);
  }

  const prefix = styleSheet.options.classNamePrefix;
  const meta = isStatic ? 'static' : 'dynamic';
  return `${prefix}-${meta}-${rule.key}-${suffix}`;
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
      <StylesProvider generateClassName={generateStableClassName} sheetsManager={new Map()}>
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

  // Helper function to extract the classes from a styleSheet.
  function getClasses(element) {
    const { useStyles } = element.type;

    let classes;
    function Listener() {
      classes = useStyles(element.props);
      return null;
    }
    mighty(<Listener />);

    return classes;
  }

  mighty.attachTo = attachTo;

  return { getClasses, mount: mighty };
}
