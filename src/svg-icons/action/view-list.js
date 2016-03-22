import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionViewList = (props) => (
  <SvgIcon {...props}>
    <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"/>
  </SvgIcon>
);
ActionViewList = pure(ActionViewList);
ActionViewList.displayName = 'ActionViewList';

export default ActionViewList;
