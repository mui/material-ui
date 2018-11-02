import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const createRow = (id, taste, bobColor, aliceColor, heidiColor, label, rowSpan) => ({
  id,
  taste,
  bobColor,
  aliceColor,
  heidiColor,
  label,
  rowSpan,
});

const rows = [
  ['Color', 'Blue', 'Purple', 'Red', 'Favorite', 2],
  ['Flavor', 'Banana', 'Chocolate', 'Vanilla'],
  ['Color', 'Yellow', 'Pink', 'Green', 'Least Favorite', 2],
  ['Flavor', 'Mint', 'Walnut', 'Rocky Road'],
].map((row, id) => createRow(id, ...row));

const labelCellOrNone = ({ label, rowSpan }) =>
  rowSpan && (
    <TableCell component="th" scope="row" rowSpan={rowSpan}>
      {label}
    </TableCell>
  );

function SpanningTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell key="th_category" />
            <TableCell key="th_taste" />
            <TableCell key="th_bob">Bob</TableCell>
            <TableCell key="th_alice">Alice</TableCell>
            <TableCell key="th_heidi">Heidi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                {labelCellOrNone(row)}
                <TableCell>{row.taste}</TableCell>
                <TableCell>{row.bobColor}</TableCell>
                <TableCell>{row.aliceColor}</TableCell>
                <TableCell>{row.heidiColor}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SpanningTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpanningTable);
