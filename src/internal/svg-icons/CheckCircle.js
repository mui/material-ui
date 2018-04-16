import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

/**
 * @ignore - internal component.
 */
let CheckCircle = props => (
  <SvgIcon {...props}>
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" />
  </SvgIcon>
);
CheckCircle = pure(CheckCircle);
CheckCircle.muiName = 'SvgIcon';

export default CheckCircle;
