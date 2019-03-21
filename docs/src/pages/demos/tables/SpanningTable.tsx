import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const TAX_RATE = 0.07;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

class Row {
  id: number;
  desc: string;
  qty: number;
  unit: number;
  price: number;
  constructor(id: number, desc: string, qty: number, unit: number, price: number) {
    this.id = id;
    this.desc = desc;
    this.qty = qty;
    this.unit = unit;
    this.price = price;
  }
}

function createRow(id: number, desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return new Row(id, desc, qty, unit, price);
}

function subtotal(items: Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  { desc: 'Paperclips (Box)', qty: 100, unit: 1.15 },
  { desc: 'Paper (Case)', qty: 10, unit: 45.99 },
  { desc: 'Waste Basket', qty: 2, unit: 17.99 },
].map((row, id) => createRow(id, row.desc, row.qty, row.unit));

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export interface SpanningTableProps extends WithStyles<typeof styles> {}

function SpanningTable(props: SpanningTableProps) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">@</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

SpanningTable.propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(SpanningTable);
