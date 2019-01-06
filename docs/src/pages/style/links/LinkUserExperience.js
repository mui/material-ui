/* eslint-disable no-script-url */
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// This resolves to nothing and doesn't affect browser history
const dudUrl = 'javascript:;';

function Links() {
  return (
    <Typography>
      Click out our <Link href={dudUrl}>latest offers</Link>.
    </Typography>
  );
}

export default Links;
