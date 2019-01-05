/* eslint-disable no-script-url */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  link: {
    margin: theme.spacing.unit,
  },
});

// This resolves to nothing and doesn't affect browser history
const dudUrl = 'javascript:;';

function Links() {
  return (
    <Typography>
      Click <Link href={dudUrl}>here</Link> to see our latest offers.
    </Typography>
  );
}

export default withStyles(styles)(Links);
