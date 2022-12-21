import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { LANGUAGES_LABEL } from 'docs/src/modules/constants';

export default function Languages() {
  return (
    <Paper sx={{ width: '100%' }}>
      <Table>
        <TableBody>
          {LANGUAGES_LABEL.map((language) => (
            <TableRow key={language.code}>
              <TableCell>
                <Typography variant="body2">{language.text}</Typography>
              </TableCell>
              <TableCell>
                <Link
                  variant="body2"
                  data-no-markdown-link="true"
                  href={language.code === 'en' ? '/' : `/${language.code}/`}
                >
                  Documentation
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
