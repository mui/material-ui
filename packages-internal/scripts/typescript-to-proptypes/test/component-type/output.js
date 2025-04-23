import * as React from 'react';
import PropTypes from 'prop-types-compat';

function Component(props) {
  const { Foo, Bar } = props;
  return (
    <>
      <Foo />
      <Bar />
    </>
  );
}

Component.propTypes = {
  Bar: PropTypes.elementType.isRequired,
  Foo: PropTypes.elementType,
};

export default Component;
