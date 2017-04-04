import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'src/Table';

function TableMultiSelect(props) {
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
        {props.data.map( (row, index) => (
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

TableMultiSelect.propTypes = {
  data: React.PropTypes.array,
};

export default TableMultiSelect;
