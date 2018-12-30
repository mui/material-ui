import React from 'react';
import cx from 'classnames';
import MuiInputAdornment from '@material-ui/core/InputAdornment';
import { INPUT_ADORNMENT } from '../../theme/core';

const InputAdornment = ({ className, flex, ...props }) => (
  <MuiInputAdornment
    className={cx(INPUT_ADORNMENT.root, className)}
    classes={{
      positionStart: INPUT_ADORNMENT.positionStart,
    }}
    {...props}
  />
);

export default InputAdornment;
