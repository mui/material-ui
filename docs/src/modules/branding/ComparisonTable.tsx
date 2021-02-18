import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from 'docs/src/modules/branding/icons/Check';
import Close from 'docs/src/modules/branding/icons/Close';

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '30px',
  },
  body: {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  tableBody: {
    // backgroundColor: 'greyF3',
    backgroundColor: '#F3F6F9 !important',
  },
}));

function createRow(type, essential, pro, premium) {
  return { type, essential, pro, premium };
}
let checkSx = {
  backgroundColor: 'rgb(204, 229, 255)',
  color: 'primary.main',
  borderRadius: '50%',
};
let closeSx = {
  backgroundColor: 'rgb(255, 255, 255)',
  color: 'primary.main',
  borderRadius: '50%',
};
const rows = [
  createRow('Open source libraries', '', '', ''),
  createRow(
    '@material-ui/core lifetime access',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    '@material-ui/core lifetime updates',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow('Advanced components', '', '', ''),
  createRow(
    '@material-ui/x',
    <Close sx={closeSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    '@material-ui/x Updates',
    <Close sx={closeSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    '@material-ui/core lifetime updates',
    <Close sx={closeSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    '@material-ui/x-grid',
    <Close sx={closeSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    '@material-ui/x Date range picker',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    '@material-ui/x Advanced data grid',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    '@material-ui/x ...',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow('Support', '', '', ''),
  createRow(
    'Community',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    'Bugs reports & feature requests',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    'Tehnical advisory*',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    'Support duration',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    'Pre-screening',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    'Issue escalation',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
  createRow(
    '*Subject to fair use policy',
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
    <CheckIcon sx={checkSx} />,
  ),
];

const tableHeader = [
  { id: 1, heading: 'Essential', src: '/static/branding/pricing/essential.svg' },
  { id: 2, heading: 'Pro', src: '/static/branding/pricing/pro.svg' },
  { id: 3, heading: 'Premium', src: '/static/branding/pricing/premium.svg' },
];

export default function ComparisonTable() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            {tableHeader.map((header) => (
              <StyledTableCell key={header.id}>
                <Box
                  component="img"
                  src={header.src}
                  loading="lazy"
                  alt={header.heading}
                  sx={{
                    // width: 20,
                    height: 24,
                    // left: 0,
                    // top: 3,
                    mr: 1,
                  }}
                />
                {header.heading}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (
            <TableRow
              key={key}
              className={key === 0 || key === 3 || key === 10 ? classes.tableBody : ''}
            >
              <StyledTableCell>{row.type}</StyledTableCell>
              <StyledTableCell>{row.essential}</StyledTableCell>
              <StyledTableCell>{row.pro}</StyledTableCell>
              <StyledTableCell>{row.premium}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
