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
  {name: 'John Smith'},
  {name: 'Randal White'},
  {name: 'Olivier'},
];

class SelectionObservingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionChangeCount: 0,
    };
  }

  render() {
    return (
      <div>
        Selection Change Count: {this.state.selectionChangeCount}
        <Table
          selectable={true}
          onRowSelection={() => this.setState({selectionChangeCount: this.state.selectionChangeCount + 1})}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
                Name
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={true}>
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  {row.name}
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default SelectionObservingTable;
