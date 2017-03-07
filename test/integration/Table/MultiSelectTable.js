import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'src/Table';

const tableData = [
  {
    name: 'John Smith',
    selected: true,
  },
  {
    name: 'Randal White',
    selected: true,
  },
  {
    name: 'Olivier',
  },
];

function TableMutliSelect() {
  return (
    <Table
      selectable={true}
      multiSelectable={true}
    >
      <TableHeader
        displaySelectAll={true}
        adjustForCheckbox={true}
        enableSelectAll={true}
      >
        <TableRow>
          <TableHeaderColumn>
            Name
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={true}>
        {tableData.map( (row, index) => (
          <TableRow key={index} selected={row.selected}>
            <TableRowColumn>
              {row.name}
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TableMutliSelect;
