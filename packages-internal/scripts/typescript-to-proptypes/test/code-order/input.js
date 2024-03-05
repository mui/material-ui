import * as React from 'react';
import PropTypes from 'prop-types';

function Component(props) {
  const { value } = props;
  return <div>{value}</div>;
}

const someValidator = () => new Error();

Component.propTypes = {
  value: PropTypes.any,
};

export default Component;
