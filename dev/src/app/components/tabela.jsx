import React from 'react';
import MUI   from 'material-ui';

const { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } = MUI;

export default React.createClass({

    render() {
        let containerStyle = {
            textAlign: 'center',
            paddingTop: '50px',
        };

        let standardActions = [
            { text: 'Okay' },
        ];

        return (<Table fixedHeader={true} multiSelectable={true} selectable={true} onRowSelection={this._handleRowSelect}>
            <TableHeader enableSelectAll={true} displaySelectAll={true}>
                <TableRow>
                    <TableHeaderColumn key={0}>H1</TableHeaderColumn>
                    <TableHeaderColumn key={1}>H2</TableHeaderColumn>
                    <TableHeaderColumn key={2}>H3</TableHeaderColumn>
                    <TableHeaderColumn key={3}>H4</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={false} showRowHover={true} displayRowCheckbox={true}>
                { [1,2,3,4,5,6,7,8,9].map(function(e, i) {
                    return (<TableRow key={i} selectable={true}>
                        { [1,2,3,4].map(function(e, j) {
                            return (<TableRowColumn key={j}>{'C' + j}</TableRowColumn>);
                        }) }
                    </TableRow>);
                }) }
            </TableBody>
        </Table>);
    },
});