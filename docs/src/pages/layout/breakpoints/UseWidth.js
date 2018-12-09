import React from 'react';
import { unstable_useWidth as useWidth } from '@material-ui/core/useWidth';
import Typography from '@material-ui/core/Typography';

const components = {
  sm: 'em',
  md: 'u',
  lg: 'del',
};

export default function UseWidth() {
  const { width } = useWidth();
  const Component = components[width] || 'span';

  return (
    <Typography variant="subtitle1">
      <Component>{`Current width: ${width}`}</Component>
    </Typography>
  );
}
