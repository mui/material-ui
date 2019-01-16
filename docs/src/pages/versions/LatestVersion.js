import 'isomorphic-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';

const styles = {
  root: {
    width: '100%',
  },
};

function LatestVersion(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell padding="dense">
              <Typography variant="body2">master branch</Typography>
            </TableCell>
            <TableCell padding="dense">
              <Link
                variant="body2"
                color="secondary"
                rel="nofollow"
                href="https://material-ui.netlify.com/"
              >
                Documentation
              </Link>
            </TableCell>
            <TableCell padding="dense">
              <Link variant="body2" color="secondary" href="https://github.com/mui-org/material-ui">
                Source code
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

LatestVersion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LatestVersion);
