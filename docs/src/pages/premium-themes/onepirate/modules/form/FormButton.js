import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import defer from './defer';

function FormButton(props) {
  const { disabled, mounted, ...others } = props;
  return (
    <Button
      disabled={!mounted || !!disabled}
      type="submit"
      variant="contained"
      {...others}
    />
  );
}

FormButton.propTypes = {
  /**
   * If `true`, the button will be disabled.
   * If `true`, the base button will be disabled.
   */
  disabled: PropTypes.bool,
  mounted: PropTypes.bool,
};

export default defer(FormButton);
