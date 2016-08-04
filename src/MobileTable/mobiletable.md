# MUI Mobile Table

MUI Mobile Table is a responsive table layout for viewing a Material UI Table Component on mobile or smaller screen devices.

### Problem
##### MUI Table component is:
  - Hard to view on mobile devices or devices with smaller screen widths.
  - Requires Scrolling when viewing larger data tables.

### Solution
  - Wrap Table Component in a higher order component such as a `<div>`
  - Pass it a className attribute and value `<div className="mobile_table">`
 ```javascript
import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import classes from './MobileTableStyles.scss'


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
                      	    <TableRowColumn data-label='Customer:'>JamesBrown</TableRowColumn>
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

export default MobileTable
```
  - Now create a new `MobileTableStyles.css` file and use plain old CSS to define media queries and select and style your table.

  ```css
<!----------mobile view----------->

@media only screen and (max-width: 800px) {
    .mobile_table {
        width: 100%;
        margin: 0;
        padding: 0;
        border-collapse: collapse;
        border-spacing: 0;
     }

    <!--hides table head-->
    .mobile_table thead {
        visibility: hidden;
        vertical-align: middle;
        border-color: inherit;
    }

    <!--forces table to not act like a table-->
    .mobile_table td {
        display: block;
        border: 1px dotted #CCCCCC;
        padding: 4%;
        height: 10%;
    }

    <!--Pulls the data label from Table Header and adds it to td-->
    .mobile_table td:before {
        content: attr(data-label);
        text-transform: uppercase;
        font-size: 1.25em;
        font-weight: bold;
        float: none;
        padding: 10px;
    }
}

<!---------desktop view----------->

@media only screen and (min-width: 801px) {
    thead {
        visibility: visible;
        }
    tr {
        display: table-row;
        margin-bottom: 0;
        }
    td {
        display: table-cell;
        border-bottom: none;
        }
    td:before {
        content: "";
        display: none;
        }
    }
```
- Now `import classes from './MobileTableStyles.scss'` at the top of your Table Component file.
- Then you can pass it `.mobile_table` via props `<div className={classes.mobile_table}>`.
- Save the file and volia done!!
