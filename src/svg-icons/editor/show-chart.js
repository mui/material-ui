import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorShowChart = (props) => (
  <SvgIcon {...props}>
    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
  </SvgIcon>
);
EditorShowChart = pure(EditorShowChart);
EditorShowChart.displayName = 'EditorShowChart';

export default EditorShowChart;
