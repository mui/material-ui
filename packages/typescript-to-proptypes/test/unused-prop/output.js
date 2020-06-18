import * as React from 'react';
import PropTypes from 'prop-types';
function Foo(props) {
  const { foo, ...rest } = props;
  return (
    <div className={props.bar} {...rest}>
      {foo}
    </div>
  );
}

Foo.propTypes = {
  bar: PropTypes.string.isRequired,
  foo: PropTypes.string.isRequired,
};

export default Foo;
