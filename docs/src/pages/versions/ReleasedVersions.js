import * as React from 'react';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';
import VersionsContext from './VersionsContext';

const GITHUB_RELEASE_BASE_URL =
  'https://github.com/mui-org/material-ui/releases/tag/';

function ReleasedVersions() {
  const versions = React.useContext(VersionsContext);

  return (
    <Box sx={{ minHeight: 33 * 11, overflow: 'auto', width: '100%' }}>
      <Table>
        <TableBody>
          {versions.map((doc) => (
            <TableRow key={doc.version}>
              <TableCell>
                <Typography variant="body2">
                  {doc.version}
                  {doc.version === `v${process.env.LIB_VERSION}` ? ' ✓' : ''}
                </Typography>
              </TableCell>
              <TableCell>
                <Link
                  variant="body2"
                  color="secondary"
                  rel="nofollow"
                  href={doc.url}
                >
                  Documentation
                </Link>
              </TableCell>
              <TableCell>
                {doc.version.length >= 6 &&
                doc.version.indexOf('pre-release') === -1 ? (
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
    </Box>
  );
}

export default ReleasedVersions;
