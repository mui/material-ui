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
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';

const GITHUB_RELEASE_BASE_URL = 'https://github.com/mui-org/material-ui/releases/tag/';
const FILTERED_BRANCHES = ['latest', 'staging', 'l10n', 'next'];

const styles = {
  root: {
    minHeight: 33 * 11,
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

function StableVersions(props) {
  const { classes } = props;
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const branches = await getBranches();
      let newDocs = branches.map(n => n.name);
      newDocs = newDocs.filter(value => FILTERED_BRANCHES.indexOf(value) === -1);
      newDocs = newDocs.map(version => ({
        version,
        // Replace dot with dashes for Netlify branch subdomains
        url: `https://${version.replace(/\./g, '-')}.material-ui.com`,
      }));
      // Current version.
      newDocs.push({
        version: `v${process.env.LIB_VERSION}`,
        url: document.location.origin,
      });
      // Legacy documentation.
      newDocs.push({
        version: 'v0',
        url: 'https://v0.material-ui.com',
      });
      newDocs = orderBy(newDocs, 'version', 'desc');
      newDocs = sortedUniqBy(newDocs, 'version');
      // The latest version is always using the naked domain.
      newDocs[0].url = 'https://material-ui.com';
      setDocs(newDocs);
    })();
  }, []);

  return (
    <div className={classes.root}>
      <Table>
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
                {doc.version.length === 6 ? (
                  <Link
                    variant="body2"
                    color="secondary"
                    rel="nofollow"
                    href={`${GITHUB_RELEASE_BASE_URL}${doc.version}`}
                  >
                    Release notes
                  </Link>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

StableVersions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StableVersions);
