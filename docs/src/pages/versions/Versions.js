import 'isomorphic-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Link from 'docs/src/modules/components/Link';

const GITHUB_RELEASE_BASE_URL = 'https://github.com/mui-org/material-ui/releases/tag/';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function pause(timeout) {
  return new Promise(accept => {
    setTimeout(accept, timeout);
  });
}

let versions = null;

async function getVersions() {
  try {
    if (!versions) {
      await pause(1e3); // Soften the pressure on the main thread.
      const result = await fetch(
        'https://raw.githubusercontent.com/mu-org/material-ui/master/docs/versions.json',
      );
      versions = await result.json();
    }
  } catch (err) {
    // Swallow the exceptions.
  }

  versions = versions || [];
}

class Versions extends React.Component {
  state = {
    versions: [],
  };

  componentDidMount = async () => {
    await getVersions();
    this.setState({ versions });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableBody>
            {this.state.versions.map(version => {
              return (
                <TableRow key={version}>
                  <TableCell>
                    <Typography>{version}</Typography>
                  </TableCell>
                  <TableCell>
                    <Link href={`https://${version}.material-ui.com`}>
                      <Typography>Documentation</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`${GITHUB_RELEASE_BASE_URL}${version}`}>
                      <Typography>Release notes</Typography>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Versions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Versions);
