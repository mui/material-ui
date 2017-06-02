import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'src/Table';

class TableMutliSelect extends Component {
  isSelected = (index) => {
    if (!this.props.selected) {
      return undefined;
    }

    return this.props.selected.indexOf(index) !== -1;
  };

  render() {
    return (
      <Table
        selectable={true}
        multiSelectable={true}
        onRowSelection={this.props.onRowSelection}
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
          {this.props.rows.map( (row, index) => (
            <TableRow key={index} selected={this.isSelected(index)}>
              <TableRowColumn>
                {row.name}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

TableMutliSelect.propTypes = {
  onRowSelection: PropTypes.func,
  rows: PropTypes.array.isRequired,
  selected: PropTypes.array,
};

export default TableMutliSelect;
