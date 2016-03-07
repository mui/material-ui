import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionChangeHistory = (props) => (
  <SvgIcon {...props}>
    <path d="M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z"/>
  </SvgIcon>
);
ActionChangeHistory = pure(ActionChangeHistory)
ActionChangeHistory.displayName = 'ActionChangeHistory';

export default ActionChangeHistory;
