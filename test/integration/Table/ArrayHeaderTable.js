import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'src/Table';

class ArrayHeaderTable extends Component {
  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          {this.props.headers.map((header, index) => (<TableRow key={index}>
            {header.columns.map((column, columnIndex) => (
              <TableHeaderColumn key={columnIndex}>{column}</TableHeaderColumn>)
            )}
          </TableRow>))}
        </TableHeader>
        <TableBody displayRowCheckbox={false} />
      </Table>
    );
  }
}


ArrayHeaderTable.propTypes = {
  headers: PropTypes.array.isRequired,
};

export default ArrayHeaderTable;
