import * as React from 'react';
import PropTypes from 'prop-types';
import { chainPropTypes } from 'some-utils-module';

function Component(props) {
  const { children } = props;
  return (
    <button>
      <span>{children}</span>
    </button>
  );
}

Component.propTypes = {
  children: chainPropTypes(PropTypes.node.isRequired, (props) => {
    const summary = React.Children.toArray(props.children)[0];
    if (isFragment(summary)) {
      return new Error('Not accepting Fragments');
    }

    if (!React.isValidElement(summary)) {
      return new Error('First child must be an element');
    }

    return null;
  }),
};

export default Component;
