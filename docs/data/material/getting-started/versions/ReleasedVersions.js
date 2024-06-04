import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/docs/Link';
import VersionsContext from 'docs/src/pages/versions/VersionsContext';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';

const GITHUB_RELEASE_BASE_URL = 'https://github.com/mui/material-ui/releases/tag/';

export default function ReleasedVersions() {
  const versions = React.useContext(VersionsContext);

  return (
    <BrandingCssVarsProvider>
      <Table sx={{ minHeight: 33 * 11, overflow: 'auto', width: '100%' }}>
        <TableBody>
          {versions &&
            versions.map((doc) => (
              <TableRow key={doc.version}>
                <TableCell>
                  <Typography variant="body2">
                    {doc.version}{' '}
                    {doc.version === `v${process.env.LIB_VERSION}` ? '✅' : ''}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link
                    variant="body2"
                    rel="nofollow"
                    href={doc.url}
                    sx={{ fontWeight: 'medium' }}
                  >
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
                      sx={{ fontWeight: 'medium' }}
                    >
                      Release notes
                    </Link>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </BrandingCssVarsProvider>
  );
}
