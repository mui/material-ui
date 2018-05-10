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

// function pause(timeout) {
//   return new Promise(accept => {
//     setTimeout(accept, timeout);
//   });
// }

// let cacheVersions = null;

// async function getVersions() {
//   try {
//     if (!cacheVersions) {
//       await pause(1e3); // Soften the pressure on the main thread.
//       const result = await fetch(
//         'https://raw.githubusercontent.com/mui-org/material-ui/v1-beta/docs/versions.json',
//       );
//       cacheVersions = await result.json();
//     }
//   } catch (err) {
//     // Swallow the exceptions.
//   }

//   cacheVersions = cacheVersions || [];
//   return cacheVersions;
// }

class StableVersions extends React.Component {
  state = {
    // versions: [],
  };

  componentDidMount = async () => {
    // const versions = await getVersions();
    // this.setState({ versions });
  };

  render() {
    const { classes } = this.props;

    const VERSIONS = [
      {
        url: 'https://material-ui-next.com',
        semver: `v${process.env.LIB_VERSION}`,
      },
      {
        url: 'https://v0.material-ui.com',
        semver: 'v0.20.1',
      },
    ];

    return (
      <Paper className={classes.root}>
        <Table>
          <TableBody>
            {VERSIONS.map(version => {
              return (
                <TableRow key={version.semver}>
                  <TableCell padding="dense">
                    <Typography>{version.semver}</Typography>
                  </TableCell>
                  <TableCell padding="dense">
                    <Typography
                      component={props2 => (
                        <Link {...props2} variant="secondary" href={version.url} />
                      )}
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
                          href={`${GITHUB_RELEASE_BASE_URL}${version.semver}`}
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
