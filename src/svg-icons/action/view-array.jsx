import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionViewArray = (props) => (
  <SvgIcon {...props}>
    <path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"/>
  </SvgIcon>
);
ActionViewArray = pure(ActionViewArray)
ActionViewArray.displayName = 'ActionViewArray';

export default ActionViewArray;
