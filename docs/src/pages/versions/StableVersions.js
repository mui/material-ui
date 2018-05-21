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

const GITHUB_RELEASE_BASE_URL = 'https://github.com/mui-org/material-ui/releases/tag/';

const styles = {
  root: {
    width: '100%',
  },
};

function pause(timeout) {
  return new Promise(accept => {
    setTimeout(accept, timeout);
  });
}

let cacheBranches = null;

async function getBranches() {
  try {
    if (!cacheBranches) {
      await pause(1e3); // Soften the pressure on the main thread.
      const result = await fetch('https://api.github.com/repos/mui-org/material-ui-docs/branches');
      cacheBranches = await result.json();
    }
  } catch (err) {
    // Swallow the exceptions.
  }

  cacheBranches = cacheBranches || [];
  return cacheBranches;
}

class StableVersions extends React.Component {
  state = {
    versions: [],
  };

  componentDidMount = async () => {
    const branches = await getBranches();
    const versions = branches.map(n => n.name);
    versions.reverse().pop(); // most recent first & remove 'latest'
    versions.push('v0.20.1');

    this.setState({ versions });
  };

  render() {
    const { classes } = this.props;
    const { versions } = this.state;

    return (
      <Paper className={classes.root}>
        <Table>
          <TableBody>
            {versions.map((version, index) => {
              // Replace dot with dashes for Netlify branch subdomains
              let url = `https://${version.replace(/\./g, '-')}.material-ui.com`;
              if (index === 0) {
                url = 'https://material-ui.com';
              } else if (version.startsWith('v0')) {
                url = 'https://v0.material-ui.com';
              }
              return (
                <TableRow key={version}>
                  <TableCell padding="dense">
                    <Typography>{version}</Typography>
                  </TableCell>
                  <TableCell padding="dense">
                    <Typography
                      component={props2 => <Link {...props2} variant="secondary" href={url} />}
                    >
                      Documentation
                    </Typography>
                  </TableCell>
                  <TableCell padding="dense">
                    <Typography
                      component={props2 => (
                        <Link
                          {...props2}
                          variant="secondary"
                          href={`${GITHUB_RELEASE_BASE_URL}${version}`}
                        />
                      )}
                    >
                      Release notes
                    </Typography>
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

StableVersions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StableVersions);
