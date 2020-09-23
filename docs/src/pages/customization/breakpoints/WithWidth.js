import * as React from 'react';
import withWidth from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography';

const components = {
  sm: 'em',
  md: 'u',
  lg: 'del',
};

function WithWidth(props) {
  const { width } = props;
  const Component = components[width] || 'span';

  return (
    <Typography>
      <Component>{`Current width: ${width}`}</Component>
    </Typography>
  );
}

export default withWidth()(WithWidth);
