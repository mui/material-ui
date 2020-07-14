import React from 'react';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

type TagName = 'em' | 'u' | 'del';

const components: Partial<Record<Breakpoint, TagName>> = {
  sm: 'em',
  md: 'u',
  lg: 'del',
};

function WithWidth(props: { width: Breakpoint }) {
  const { width } = props;
  const Component = components[width] || 'span';

  return (
    <Typography>
      <Component>{`Current width: ${width}`}</Component>
    </Typography>
  );
}

export default withWidth()(WithWidth);
