import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { LANGUAGES_LABEL } from 'docs/src/modules/constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function Languages() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
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
                  color="secondary"
                  data-no-link="true"
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
