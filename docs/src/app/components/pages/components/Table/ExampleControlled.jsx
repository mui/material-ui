import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const tableData = [
  {
    name: 'Apples',
    status: 'In Stock',
  },
  {
    name: 'Pears',
    status: 'Low Stock',
    selected: true,
  },
  {
    name: 'Melon',
    status: 'Out of Stock',
  },
  {
    name: 'Kiwi',
    status: 'On Order',
  },
];

export default class TableExampleControlled extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: tableData,
    };
  }

  handleRowClick = (event, value) => {
    const tableData = this.state.tableData;
    tableData[value].selected = !tableData[value].selected;
    this.setState({tableData: tableData});
  };

  render() {
    return (
      <Table
        selectable={true}
      >
        <TableHeader
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Fruit</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={true}
          showRowHover={true}
        >
          {tableData.map( (row, index) => (
            <TableRow
              key={index}
              onRowClick={this.handleRowClick}
              selected={row.selected}
            >
              <TableRowColumn>{index}</TableRowColumn>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.status}</TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}
