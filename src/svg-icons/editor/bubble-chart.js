import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorBubbleChart = (props) => (
  <SvgIcon {...props}>
    <circle cx="7.2" cy="14.4" r="3.2"/><circle cx="14.8" cy="18" r="2"/><circle cx="15.2" cy="8.8" r="4.8"/>
  </SvgIcon>
);
EditorBubbleChart = pure(EditorBubbleChart);
EditorBubbleChart.displayName = 'EditorBubbleChart';

export default EditorBubbleChart;
