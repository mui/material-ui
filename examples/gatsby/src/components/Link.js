import React from 'react';
import MuiLink from '@material-ui/core/Link';
import { Link as GastsbyLink } from 'gatsby';

const Link = React.forwardRef(function Link(props, ref) {
  return <MuiLink component={GastsbyLink} ref={ref} {...props} />;
});

export default Link;
