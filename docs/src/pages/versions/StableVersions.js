import 'isomorphic-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import sortedUniqBy from 'lodash/sortedUniqBy';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';

const GITHUB_RELEASE_BASE_URL = 'https://github.com/mui-org/material-ui/releases/tag/';
const FILTERED_BRANCHES = ['latest', 'staging', 'l10n', 'next'];

const styles = {
  root: {
    height: 410,
    overflow: 'auto',
    width: '100%',
  },
};

let cacheBranches = null;

async function getBranches() {
  try {
    if (!cacheBranches) {
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
    docs: [],
  };

  async componentDidMount() {
    const branches = await getBranches();
    let docs = branches.map(n => n.name);
    docs = docs.filter(value => FILTERED_BRANCHES.indexOf(value) === -1);
    docs = docs.map(version => ({
      version,
      // Replace dot with dashes for Netlify branch subdomains
      url: `https://${version.replace(/\./g, '-')}.material-ui.com`,
    }));
    // Current version.
    docs.push({
      version: `v${process.env.LIB_VERSION}`,
      url: document.location.origin,
    });
    // Legacy documentation.
    docs.push({
      version: 'v0.20.1',
      url: 'https://v0.material-ui.com',
    });
    docs = orderBy(docs, 'version', 'desc');
    docs = sortedUniqBy(docs, 'version');
    // The latest version is always using the naked domain.
    docs[0].url = 'https://material-ui.com';
    this.setState({ docs });
  }

  render() {
    const { classes } = this.props;
    const { docs } = this.state;

    return (
      <Paper className={classes.root}>
        <Table size="small">
          <TableBody>
            {docs.map(doc => (
              <TableRow key={doc.version}>
                <TableCell>
                  <Typography variant="body2">
                    {doc.version}
                    {doc.version === `v${process.env.LIB_VERSION}` ? ' ✓' : ''}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link variant="body2" color="secondary" rel="nofollow" href={doc.url}>
                    Documentation
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    variant="body2"
                    color="secondary"
                    rel="nofollow"
                    href={`${GITHUB_RELEASE_BASE_URL}${doc.version}`}
                  >
                    Release notes
                  </Link>
                </TableCell>
              </TableRow>
            ))}
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
