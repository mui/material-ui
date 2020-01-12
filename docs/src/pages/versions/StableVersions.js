import 'isomorphic-fetch';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';

const GITHUB_RELEASE_BASE_URL = 'https://github.com/mui-org/material-ui/releases/tag/';

const styles = {
  root: {
    minHeight: 33 * 11,
    overflow: 'auto',
    width: '100%',
  },
};

function StableVersions(props) {
  const { classes } = props;
  // eslint-disable-next-line no-underscore-dangle
  const [docs, setDocs] = React.useState(global.__VERSION__);

  React.useEffect(() => {
    (async () => {
      // eslint-disable-next-line no-underscore-dangle
      setDocs(global.__VERSION__);
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
