import * as React from 'react';
import PropTypes from 'prop-types';

function TextField(props) {
  const { value, variant } = props;

  return (
    <React.Fragment>
      {variant}: <input value={value} />
    </React.Fragment>
  );
}

TextField.propTypes = {
  value: PropTypes.any,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default TextField;
