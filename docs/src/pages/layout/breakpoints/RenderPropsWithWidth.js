import React from 'react';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import toRenderProps from 'recompose/toRenderProps';

const WithWidth = toRenderProps(withWidth());

function RenderPropsWithWidth() {
  return (
    <WithWidth>
      {({ width }) => <Typography variant="subtitle1">Current width: {width}</Typography>}
    </WithWidth>
  );
}

export default RenderPropsWithWidth;
