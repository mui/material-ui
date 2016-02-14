import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionViewColumn = (props) => (
  <SvgIcon {...props}>
    <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/>
  </SvgIcon>
);
ActionViewColumn = pure(ActionViewColumn)
ActionViewColumn.displayName = 'ActionViewColumn';

export default ActionViewColumn;
