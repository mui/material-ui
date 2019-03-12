import React from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { mount as enzymeMount } from 'enzyme';

// Generate an enhanced mount function.
export default function createMount(options = {}) {
  const { mount = enzymeMount, strict: strictOption, ...enzymeOptions } = options;

  const attachTo = window.document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  window.document.body.insertBefore(attachTo, window.document.body.firstChild);

  /**
   * Can't just mount <React.Fragment>{node}</React.Fragment>
   * because that swallows wrapper.setProps
   *
   * why class component:
   * https://github.com/airbnb/enzyme/issues/2043
   */

  class Mode extends React.PureComponent {
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
      const { __element, __strict, ...other } = this.props;
      const Component = __strict ? React.StrictMode : React.Fragment;

      return <Component>{React.cloneElement(__element, other)}</Component>;
    }
  }

  const mountWithContext = function mountWithContext(node, localOptions = {}) {
    const {
      disableUnnmount = false,
      strict: localStrictOption = strictOption,
      ...localEnzymeOptions
    } = localOptions;

    if (!disableUnnmount) {
      ReactDOM.unmountComponentAtNode(attachTo);
    }

    // some tests require that no other components are in the tree
    // e.g. when doing .instance(), .state() etc.
    return mount(
      localStrictOption == null ? (
        node
      ) : (
        <Mode __element={node} __strict={Boolean(localStrictOption)} />
      ),
      {
        attachTo,
        ...enzymeOptions,
        ...localEnzymeOptions,
      },
    );
  };

  mountWithContext.attachTo = attachTo;
  mountWithContext.cleanUp = () => {
    ReactDOM.unmountComponentAtNode(attachTo);
    attachTo.parentNode.removeChild(attachTo);
  };

  return mountWithContext;
}
