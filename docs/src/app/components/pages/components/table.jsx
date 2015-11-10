const React = require('react');
const CodeExample = require('../../code-example/code-example');
const Router = require('react-router');
const ComponentDoc = require('../../component-doc');
const {
  Table,
  TableBody,
  TableHeader,
  TableFooter,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TextField,
  Toggle,
  Paper,
} = require('material-ui');

const Code = require('table-code');
const CodeBlock = require('../../code-example/code-block');

export default class TablePage extends React.Component {

  constructor(props) {
    super(props);

    this._onToggle = this._onToggle.bind(this);
    this.onChange = this._onChange.bind(this);
    this._onRowSelection = this._onRowSelection.bind(this);

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

    let desc = 'Composible data table component. The table must be contain TableHeader and TableBody. TableFooter ' +
      'is optional. Each table component can be provided the props className and style. All components will have a ' +
      'default className of "mui-table-XXX" where XXX is the component.';

    let componentInfo = [
      {
        name: 'Table Props',
        infoArray: [
          {
            name: 'allRowsSelected',
            type: 'boolean',
            header: 'default: false',
            desc: 'Set to true to indicate that all rows should be selected.',
          },
          {
            name: 'fixedFooter',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, the footer will appear fixed below the table. The default value is true.',
          },
          {
            name: 'fixedHeader',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, the header will appear fixed above the table. The default value is true.',
          },
          {
            name: 'height',
            type: 'string',
            header: 'optional',
            desc: 'The height of the table.',
          },
          {
            name: 'multiSelectable',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, multiple table rows can be selected. CTRL/CMD+Click and SHIFT+Click are valid actions. The ' +
              'default value is false.',
          },
          {
            name: 'selectable',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, table rows can be selected. If multiple row selection is desired, enable multiSelectable. ' +
              'The default value is true.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the table\'s root element.',
          },
        ],
      },
      {
        name: 'Table Header Props',
        infoArray: [
          {
            name: 'adjustForCheckbox',
            type: 'boolean',
            header: 'default: true',
            desc: 'Controls whether or not header rows should be adjusted for a checkbox column. If the select all checkbox ' +
              'is true, this property will not influence the number of columns. This is mainly useful for "super header" ' +
              'rows so that the checkbox column does not create an offset that needs to be accounted for manually.',
          },
          {
            name: 'displaySelectAll',
            type: 'boolean',
            header: 'default: true',
            desc: 'Controls whether or not the select all checkbox is displayed.',
          },
          {
            name: 'enableSelectAll',
            type: 'boolean',
            header: 'default: true',
            desc: 'If set to true, the select all button will be interactable. If set to false, the button will not ' +
              'be interactable. To hide the checkbox, set displaySelectAll to false.',
          },
          {
            name: 'selectAllSelected',
            type: 'boolean',
            header: 'default: true',
            desc: 'If set to true the select all checkbox will be programmatically checked and will not trigger the select ' +
              'all event.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the table header\'s root element.',
          },
        ],
      },
      {
        name: 'Table Body Props',
        infoArray: [
          {
            name: 'allRowsSelected',
            type: 'boolean',
            header: 'default: false',
            desc: 'Set to true to indicate that all rows should be selected.',
          },
          {
            name: 'deselectOnClickAway',
            type: 'boolean',
            header: 'default: true',
            desc: 'Controls whether or not to deselect all selected rows after clicking outside the table.',
          },
          {
            name: 'displayRowCheckbox',
            type: 'boolean',
            header: 'optional',
            desc: 'Controls the display of the row checkbox. The default value is true.',
          },
          {
            name: 'multiSelectable',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, multiple table rows can be selected. CTRL/CMD+Click and SHIFT+Click are valid actions. The ' +
              'default value is false.',
          },
          {
            name: 'preScanRows',
            type: 'boolean',
            header: 'default: true',
            desc: 'Controls whether or not the rows are pre-scanned to determine initial state. If your table has a large ' +
              'number of rows and you are experiencing a delay in rendering, turn off this property.',
          },
          {
            name: 'selectable',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, table rows can be selected. If multiple row selection is desired, enable multiSelectable. ' +
              'The default value is true.',
          },
          {
            name: 'showRowHover',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, table rows will be highlighted when the cursor is hovering over the row. The default value ' +
              'is false.',
          },
          {
            name: 'stripedRows',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, every other table row starting with the first row will be striped. The default value is false.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the table body\'s root element.',
          },
        ],
      },
      {
        name: 'Table Footer Props',
        infoArray: [
          {
            name: 'adjustForCheckbox',
            type: 'boolean',
            header: 'default: true',
            desc: 'Controls whether or not header rows should be adjusted for a checkbox column. If the select all checkbox ' +
              'is true, this property will not influence the number of columns. This is mainly useful for "super header" ' +
              'rows so that the checkbox column does not create an offset that needs to be accounted for manually.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the table footer\'s root element.',
          },
        ],
      },
      {
        name: 'Table Row Props',
        infoArray: [
          {
            name: 'displayBorder',
            type: 'boolean',
            header: 'default: true',
            desc: 'If true, row border will be displayed for the row. If false, no border will be drawn.',
          },
          {
            name: 'hoverable',
            type: 'boolean',
            header: 'default: false',
            desc: 'Controls whether or not the row reponseds to hover events.',
          },
          {
            name: 'rowNumber',
            type: 'number',
            header: 'optional',
            desc: 'Number to identify the row. This property is automatically populated when used with the TableBody component.',
          },
          {
            name: 'selectable',
            type: 'boolean',
            header: 'default: true',
            desc: 'If true, table rows can be selected. If multiple row selection is desired, enable multiSelectable. ' +
              'The default value is true.',
          },
          {
            name: 'selected',
            type: 'boolean',
            header: 'default: false',
            desc: 'Indicates that a particular row is selected. This property can be used to programmatically select rows.',
          },
          {
            name: 'striped',
            type: 'boolean',
            header: 'default: false',
            desc: 'Indicates whether or not the row is striped.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the table row\'s root element.',
          },
        ],
      },
      {
        name: 'Table Header Column Props',
        infoArray: [
          {
            name: 'columnNumber',
            type: 'number',
            header: 'optional',
            desc: 'Number to identify the header row. This property is automatically populated when used with TableHeader.',
          },
          {
            name: 'tooltip',
            type: 'string',
            header: 'optional',
            desc: 'The string to supply to the tooltip. If not string is supplied no tooltip will be shown.',
          },
          {
            name: 'tooltipStyle',
            type: 'object',
            header: 'optional',
            desc: 'Additional styling that can be applied to the tooltip.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the table header column\'s root element.',
          },
        ],
      },
      {
        name: 'Table Row Column Props',
        infoArray: [
          {
            name: 'columnNumber',
            type: 'number',
            header: 'optional',
            desc: 'Number to identify the header row. This property is automatically populated when used with TableHeader.',
          },
          {
            name: 'hoverable',
            type: 'boolean',
            header: 'default: false',
            desc: 'If true, this column responds to hover events.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the table row column\'s root element.',
          },
        ],
      },
      {
        name: 'Table Events',
        infoArray: [
          {
            name: 'onRowSelection',
            type: 'function(selectedRows)',
            header: 'optional',
            desc: 'Called when a row is selected. selectedRows is an array of all row selections. IF all rows have been ' +
              'selected, the string "all" will be returned instead to indicate that all rows have been selected.',
          },
          {
            name: 'onCellClick',
            type: 'function(rowNumber, columnId)',
            header: 'optional',
            desc: 'Called when a row cell is clicked. rowNumber is the row number and columnId is the column number ' +
              'or the column key.',
          },
          {
            name: 'onRowHover',
            type: 'function(rowNumber)',
            header: 'optional',
            desc: 'Called when a table row is hovered. rowNumber is the row number of the hovered row.',
          },
          {
            name: 'onRowHoverExit',
            type: 'function(rowNumber)',
            header: 'optional',
            desc: 'Called when a table row is no longer hovered. rowNumber is the row number of the row that is no ' +
              'longer hovered.',
          },
          {
            name: 'onCellHover',
            type: 'function(rowNumber, columnId)',
            header: 'optional',
            desc: 'Called when a table cell is hovered. rowNumber is the row number of the hovered row and columnId is ' +
              'the column number or the column key of the cell.',
          },
          {
            name: 'onCellHoverExit',
            type: 'function(rowNumber, columnId)',
            header: 'optional',
            desc: 'Called when a table cell is no longer hovered. rowNumber is the row number of the row and columnId is ' +
              'the column number or the column key of the cell.',
          },
        ],
      },
      {
        name: 'Table Header Events',
        infoArray: [
          {
            name: 'onSelectAll',
            type: 'function(checked)',
            header: 'optional',
            desc: 'Called when the select all checkbox has been toggled.',
          },
        ],
      },
    ];

    let propContainerStyle = {
      width: '200px',
      overflow: 'hidden',
      margin: '20px auto 0 auto',
    };

    return (
      <ComponentDoc
        name="Table"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statements:\nconst Table = require(\'material-ui/lib/table/table\');\n' +
            'const TableBody = require(\'material-ui/lib/table/table-body\');\n' +
            'const TableFooter = require(\'material-ui/lib/table/table-footer\');\n' +
            'const TableHeader = require(\'material-ui/lib/table/table-header\');\n' +
            'const TableHeaderColumn = require(\'material-ui/lib/table/table-header-column\');\n' +
            'const TableRow = require(\'material-ui/lib/table/table-row\');\n' +
            'const TableRowColumn = require(\'material-ui/lib/table/table-row-column\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <div className="table-examples">
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
                onToggle={this._onToggle}
                defaultToggled={this.state.fixedHeader} />

              <Toggle
                name="fixedFooter"
                label="Fixed Footer"
                onToggle={this._onToggle}
                defaultToggled={this.state.fixedFooter} />

              <Toggle
                name="stripedRows"
                label="Stripe Rows"
                onToggle={this._onToggle}
                defaultToggled={this.state.stripedRows} />

              <Toggle
                name="showRowHover"
                label="Show Row Hover"
                onToggle={this._onToggle}
                defaultToggled={this.state.showRowHover} />

              <Toggle
                name="selectable"
                label="Selectable"
                onToggle={this._onToggle}
                defaultToggled={this.state.selectable} />

              <Toggle
                name="multiSelectable"
                label="Multi-Selectable"
                onToggle={this._onToggle}
                defaultToggled={this.state.multiSelectable} />

              <Toggle
                name="enableSelectAll"
                label="Enable Select All"
                onToggle={this._onToggle}
                defaultToggled={this.state.enableSelectAll} />

              <Toggle
                name="deselectOnClickaway"
                label="Deselect On Clickaway"
                onToggle={this._onToggle}
                defaultToggled={this.state.deselectOnClickaway} />

            </div>
          </div>
        </CodeExample>
      </ComponentDoc>
    );
  }

  _onChange(e) {
    this.setState({height: e.target.value});
  }

  _onToggle(e, toggled) {
    let state = {};
    state[e.target.name] = toggled;
    this.setState(state);
  }

  _onRowSelection(rows) {
    console.log(rows);
  }
}
