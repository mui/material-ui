import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';

const propContainerStyle = {
  width: 200,
  overflow: 'hidden',
  margin: '20px auto 0 auto',
};

export default class TableExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this._handleToggle = (event, toggled) => {
      let state = {};
      state[event.target.name] = toggled;
      this.setState(state);
    };

    this._onChange = (event) => {
      this.setState({height: event.target.value});
    };

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      height: '300px',
    };
  }

  render() {

    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
          onRowSelection={this._onRowSelection}>
          <TableHeader enableSelectAll={this.state.enableSelectAll}>
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}>
            <TableRow selected={true}>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>Randal White</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
            <TableRow selected={true}>
              <TableRowColumn>3</TableRowColumn>
              <TableRowColumn>Stephanie Sanders</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>4</TableRowColumn>
              <TableRowColumn>Steve Brown</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>5</TableRowColumn>
              <TableRowColumn>Joyce Whitten</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>6</TableRowColumn>
              <TableRowColumn>Samuel Roberts</TableRowColumn>
              <TableRowColumn>Unemployed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>7</TableRowColumn>
              <TableRowColumn>Adam Moore</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>

        <div style={propContainerStyle}>
          <h3>Table Properties</h3>
          <TextField
            floatingLabelText="Table Body Height"
            defaultValue={this.state.height}
            onChange={this._onChange} />

          <Toggle
            name="fixedHeader"
            label="Fixed Header"
            onToggle={this._handleToggle}
            defaultToggled={this.state.fixedHeader} />

          <Toggle
            name="fixedFooter"
            label="Fixed Footer"
            onToggle={this._handleToggle}
            defaultToggled={this.state.fixedFooter} />

          <Toggle
            name="stripedRows"
            label="Stripe Rows"
            onToggle={this._handleToggle}
            defaultToggled={this.state.stripedRows} />

          <Toggle
            name="showRowHover"
            label="Show Row Hover"
            onToggle={this._handleToggle}
            defaultToggled={this.state.showRowHover} />

          <Toggle
            name="selectable"
            label="Selectable"
            onToggle={this._handleToggle}
            defaultToggled={this.state.selectable} />

          <Toggle
            name="multiSelectable"
            label="Multi-Selectable"
            onToggle={this._handleToggle}
            defaultToggled={this.state.multiSelectable} />

          <Toggle
            name="enableSelectAll"
            label="Enable Select All"
            onToggle={this._handleToggle}
            defaultToggled={this.state.enableSelectAll} />

          <Toggle
            name="deselectOnClickaway"
            label="Deselect On Clickaway"
            onToggle={this._handleToggle}
            defaultToggled={this.state.deselectOnClickaway} />

        </div>
      </div>
    );
  }
}
