import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import classes from './MobileTableStyles.scss';


class MobileTable extends React.Component {
  render() {
    return (
      <div className={classes.mobile_table}>
        <Table>
        	<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          	<TableRow>
          		<TableHeaderColumn>Customer</TableHeaderColumn>
          		<TableHeaderColumn>Manager</TableHeaderColumn>
          		<TableHeaderColumn>Vehicle</TableHeaderColumn>
              <TableHeaderColumn>City</TableHeaderColumn>
              <TableHeaderColumn>State</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
          	</TableRow>
          </TableHeader>
          	<TableBody displayRowCheckbox={false}>
          	<TableRow>
          		<TableRowColumn data-label='Customer:'>James Brown</TableRowColumn>
          		<TableRowColumn data-label='Manger:'>Rick Case</TableRowColumn>
          		<TableRowColumn data-label='Vehicle:'>Cadillac</TableRowColumn>
              <TableRowColumn data-label='City:'>Miami</TableRowColumn>
              <TableRowColumn data-label='State:'>Florida</TableRowColumn>
              <TableRowColumn data-label='Email:'>James@Brown.com</TableRowColumn>
          	</TableRow>
            <TableRow>
              <TableRowColumn data-label='Customer:'>James Brown</TableRowColumn>
          		<TableRowColumn data-label='Manger:'>Rick Case</TableRowColumn>
          		<TableRowColumn data-label='Vehicle:'>Cadillac</TableRowColumn>
              <TableRowColumn data-label='City:'>Miami</TableRowColumn>
              <TableRowColumn data-label='State:'>Florida</TableRowColumn>
              <TableRowColumn data-label='Email:'>James@Brown.com</TableRowColumn>
          	</TableRow>
            <TableRow>
              <TableRowColumn data-label='Customer:'>James Brown</TableRowColumn>
          		<TableRowColumn data-label='Manger:'>Rick Case</TableRowColumn>
          		<TableRowColumn data-label='Vehicle:'>Cadillac</TableRowColumn>
              <TableRowColumn data-label='City:'>Miami</TableRowColumn>
              <TableRowColumn data-label='State:'>Florida</TableRowColumn>
              <TableRowColumn data-label='Email:'>James@Brown.com</TableRowColumn>
          	</TableRow>
            <TableRow>
              <TableRowColumn data-label='Customer:'>James Brown</TableRowColumn>
          		<TableRowColumn data-label='Manger:'>Rick Case</TableRowColumn>
          		<TableRowColumn data-label='Vehicle:'>Cadillac</TableRowColumn>
              <TableRowColumn data-label='City:'>Miami</TableRowColumn>
              <TableRowColumn data-label='State:'>Florida</TableRowColumn>
              <TableRowColumn data-label='Email:'>James@Brown.com</TableRowColumn>
          	</TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}


export default MobileTable;
