import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/docs/Link';

const GITHUB_RELEASE_BASE_URL = 'https://github.com/mui/material-ui/releases/tag/';

const VersionsContext = React.createContext(null);

if (process.env.NODE_ENV !== 'production') {
  VersionsContext.displayName = 'VersionsContext';
}

export default function ReleasedVersions() {
  const versions = React.useContext(VersionsContext);

  return (
    <Table sx={{ minHeight: 33 * 11, overflow: 'auto', width: '100%' }}>
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
              <Link variant="body2" rel="nofollow" href={doc.url}>
                Documentation
              </Link>
            </TableCell>
            <TableCell>
              {doc.version.length >= 6 &&
              doc.version.indexOf('pre-release') === -1 ? (
                <Link
                  variant="body2"
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
  );
}
