import React from 'react';

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
export default defer(FormButton);
