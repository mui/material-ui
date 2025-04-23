import * as React from 'react';
import PropTypes from 'prop-types-compat';
import chainPropTypes from './chainPropTypes';

interface ChainProps {
  foo?: boolean;
}

const Chain: React.FC<ChainProps> = function Chain(props) {
  return <div />;
};

Chain.propTypes = {
  foo: chainPropTypes(PropTypes.bool, () => {
    return null;
  }),
};
