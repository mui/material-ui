let React = require('react');
let CodeExample = require('../../code-example/code-example');
let { Table, TextField, Toggle } = require('material-ui');
let Router = require('react-router');
let ComponentDoc = require('../../component-doc');


class TablePage extends React.Component {

  constructor() {
    super();

    this._onToggle = this._onToggle.bind(this);
    this.onChange = this._onChange.bind(this);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      canSelectAll: false,
      height: '300px',
      rowData: this._getRowData()
    };
  }

  _getRowData() {
    let rowData = [
      {selected: true, id: {content: '1'}, name: {content: 'John Smith'}, status: {content: 'Employed'}},
      {id: {content: '2'}, name: {content: 'Randal White'}, status: {content: 'Unemployed'}},
      {selected: true, id: {content: '3'}, name: {content: 'Stephanie Sanders'}, status: {content: 'Employed'}},
      {id: {content: '4'}, name: {content: 'Steve Brown'}, status: {content: 'Employed'}},
      {id: {content: '5'}, name: {content: 'Joyce Whitten'}, status: {content: 'Employed'}},
      {id: {content: '6'}, name: {content: 'Samuel Roberts'}, status: {content: 'Unemployed'}},
      {id: {content: '7'}, name: {content: 'Adam Moore'}, status: {content: 'Employed'}},
      {id: {content: '8'}, name: {content: 'Robert Brown'}, status: {content: 'Employed'}},
      {id: {content: '9'}, name: {content: 'Elizabeth Stevenson'}, status: {content: 'Employed'}},
      {id: {content: '10'}, name: {content: 'Zachary Dobb'}, status: {content: 'Employed'}},
      {id: {content: '11'}, name: {content: 'Zachary Dobb'}, status: {content: 'Employed'}}
    ];

    return rowData;
  }

  render() {
    let code =  `
// Row data
let rowData = [
  {selected: true, id: {content: '1'}, name: {content: 'John Smith'}, status: {content: 'Employed'}},
  {id: {content: '2'}, name: {content: 'Randal White'}, status: {content: 'Unemployed'}},
  {selected: true, id: {content: '3'}, name: {content: 'Stephanie Sanders'}, status: {content: 'Employed'}},
  {id: {content: '4'}, name: {content: 'Steve Brown'}, status: {content: 'Employed'}},
  {id: {content: '5'}, name: {content: 'Joyce Whitten'}, status: {content: 'Employed'}},
  {id: {content: '6'}, name: {content: 'Samuel Roberts'}, status: {content: 'Unemployed'}},
  {id: {content: '7'}, name: {content: 'Adam Moore'}, status: {content: 'Employed'}},
  {id: {content: '8'}, name: {content: 'Robert Brown'}, status: {content: 'Employed'}},
  {id: {content: '9'}, name: {content: 'Elizabeth Stevenson'}, status: {content: 'Employed'}},
  {id: {content: '10'}, name: {content: 'Zachary Dobb'}, status: {content: 'Employed'}},
  {id: {content: '11'}, name: {content: 'Zachary Dobb'}, status: {content: 'Employed'}}
];

// State
this.state = {
  fixedHeader: true,
  fixedFooter: true,
  stripedRows: false,
  showRowHover: false,
  selectable: true,
  multiSelectable: false,
  canSelectAll: false,
  height: '300px',
  rowData: rowData
};

// Column configuration
let headerCols = {
  id: {
    content: 'ID',
    tooltip: 'The ID'
  },
  name: {
    content: 'Name',
    tooltip: 'The name'
  },
  status: {
    content: 'Status',
    tooltip: 'The status'
  }
};
let colOrder = ['id', 'name', 'status'];
// Footer column content can also be specified as [ 'ID', 'Name', 'Status'].
let footerCols = {id: {content: 'ID'}, name: {content: 'Name'}, status: {content: 'Status'}};

// Table component
<Table
  headerColumns={headerCols}
  footerColumns={footerCols}
  columnOrder={colOrder}
  rowData={this.state.rowData}
  height={this.state.height}
  fixedHeader={this.state.fixedHeader}
  fixedFooter={this.state.fixedFooter}
  stripedRows={this.state.stripedRows}
  showRowHover={this.state.showRowHover}
  selectable={this.state.selectable}
  multiSelectable={this.state.multiSelectable}
  canSelectAll={this.state.canSelectAll} />
    `;

    let desc = 'Data table component.';

    let componentInfo = [
      {
        name: 'Table Props',
        infoArray: [
          {
            name: 'rowData',
            type: 'array',
            header: 'required',
            desc: 'Specify the row data. If the row data is specified as an array of objects, columnOrder must be provided. If an array of arrays is provided the order is determined by index position. Column data within a row can be represented two ways. The first, as an object with a content key and optionally a style key ({content: \'some data\', style: myStyleObj}). Secondly, if only content is provided simply provide the content without putting it in an object.'
          },
          {
            name: 'canSelectAll',
            type: 'boolean',
            header: 'optional',
            desc: 'Controls whether or not the user can select all of the rows in the table. The default value is false.'
          },
          {
            name: 'columnOrder',
            type: 'array',
            header: 'optional',
            desc: 'An array indicating the order that the columns should appear. If this field is provided the data must be objects consisting of these keys so that the data can be displayed in the correct order.'
          },
          {
            name: 'defaultColumnWidth',
            type: 'string',
            header: 'optional',
            desc: 'The default value of a table column. The initial value is 50px.'
          },
          {
            name: 'displayRowCheckbox',
            type: 'boolean',
            header: 'optional',
            desc: 'Controls the display of the row checkbox. The default value is true.'
          },
          {
            name: 'displaySelectAll',
            type: 'boolean',
            header: 'optional',
            desc: 'Controls whether or not the select all checkbox is displayed. The default value is true.'
          },
          {
            name: 'fixedFooter',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, the footer will appear fixed below the table. The default value is true.'
          },
          {
            name: 'fixedHeader',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, the header will appear fixed above the table. The default value is true.'
          },
          {
            name: 'footer',
            type: 'element',
            header: 'optional',
            desc: 'If customization of the footer is required a table-footer elemet can be provided. If this field is provided footerColumns will be ignored.'
          },
          {
            name: 'footerColumns',
            type: 'object',
            header: 'optional',
            desc: 'An array or object containing the footer column information.'
          },
          {
            name: 'header',
            type: 'element',
            header: 'optional',
            desc: 'If customization of the header is required a table-header element can be provided. If this field is provided headerColumns will be ignored.'
          },
          {
            name: 'headerColumns',
            type: 'object',
            header: 'optional',
            desc: 'An array or object containing the header column information.'
          },
          {
            name: 'height',
            type: 'string',
            header: 'optional',
            desc: 'The height of the table.'
          },
          {
            name: 'multiSelectable',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, multiple table rows can be selected. CTRL/CMD+Click and SHIFT+Click are valid actions. The default value is false.'
          },
          {
            name: 'preScanRowData',
            type: 'boolean',
            header: 'default: true',
            desc: 'Controls whether or not the rowData is pre-scanned to determine initial state. If your table has a large number of rows and you are experiencing a delay in rendering, turn off this property.'
          },
          {
            name: 'selectable',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, table rows can be selected. If multiple row selection is desired, enable multiSelectable. The default value is true.'
          },
          {
            name: 'showRowHover',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, table rows will be highlighted when the cursor is hovering over the row. The default value is false.'
          },
          {
            name: 'stripedRows',
            type: 'boolean',
            header: 'optional',
            desc: 'If true, every other table row starting with the first row will be striped. The default value is false.'
          }
        ]
      },
      {
        name: 'Table Events',
        infoArray: [
          {
            name: 'onRowSelection',
            type: 'function(selectedRows)',
            header: 'optional',
            desc: 'Called when a row is selected. selectedRows is an array of all row selections.'
          },
          {
            name: 'onCellClick',
            type: 'function(rowNumber, columnId)',
            header: 'optional',
            desc: 'Called when a row cell is clicked. rowNumber is the row number and columnId is the column number or the column key.'
          },
          {
            name: 'onRowHover',
            type: 'function(rowNumber)',
            header: 'optional',
            desc: 'Called when a table row is hovered. rowNumber is the row number of the hovered row.'
          },
          {
            name: 'onRowHoverExit',
            type: 'function(rowNumber)',
            header: 'optional',
            desc: 'Called when a table row is no longer hovered. rowNumber is the row number of the row that is no longer hovered.'
          },
          {
            name: 'onCellHover',
            type: 'function(rowNumber, columnId)',
            header: 'optional',
            desc: 'Called when a table cell is hovered. rowNumber is the row number of the hovered row and columnId is the column number or the column key of the cell.'
          },
          {
            name: 'onCellHoverExit',
            type: 'function(rowNumber, columnId)',
            header: 'optional',
            desc: 'Called when a table cell is no longer hovered. rowNumber is the row number of the row and columnId is the column number or the column key of the cell.'
          }
        ]
      }
    ];

    let headerCols = {id: {content: 'ID', tooltip: 'The ID'}, name: {content: 'Name', tooltip: 'The name'}, status: {content: 'Status', tooltip: 'The status'}};
    let colOrder = ['id', 'name', 'status'];
    let footerCols = {id: {content: 'ID'}, name: {content: 'Name'}, status: {content: 'Status'}};

    let propContainerStyle = {
      width: '200px',
      overflow: 'hidden',
      margin: '20px auto 0 auto'
    };

    return (
      <ComponentDoc
        name="Table"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <div className='table-examples'>
          <Table
            headerColumns={headerCols}
            footerColumns={footerCols}
            columnOrder={colOrder}
            rowData={this.state.rowData}
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            stripedRows={this.state.stripedRows}
            showRowHover={this.state.showRowHover}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
            canSelectAll={this.state.canSelectAll} />

          <div style={propContainerStyle}>
            <h3>Table Properties</h3>
            <TextField
              floatingLabelText='Table Body Height'
              defaultValue={this.state.height}
              onChange={this._onChange} />

            <Toggle
              name='fixedHeader'
              label='Fixed Header'
              onToggle={this._onToggle}
              defaultToggled={this.state.fixedHeader} />

            <Toggle
              name='fixedFooter'
              label='Fixed Footer'
              onToggle={this._onToggle}
              defaultToggled={this.state.fixedFooter} />

            <Toggle
              name='stripedRows'
              label='Stripe Rows'
              onToggle={this._onToggle}
              defaultToggled={this.state.stripedRows} />

            <Toggle
              name='showRowHover'
              label='Show Row Hover'
              onToggle={this._onToggle}
              defaultToggled={this.state.showRowHover} />

            <Toggle
              name='selectable'
              label='Selectable'
              onToggle={this._onToggle}
              defaultToggled={this.state.selectable} />

            <Toggle
              name='multiSelectable'
              label='Multi-Selectable'
              onToggle={this._onToggle}
              defaultToggled={this.state.multiSelectable} />

            <Toggle
              name='canSelectAll'
              label='Can Select All'
              onToggle={this._onToggle}
              defaultToggled={this.state.canSelectAll} />

          </div>
        </div>
      </ComponentDoc>
    );
  }

  _onChange(e) {
    let rowData = [
      {id: {content: '1'}, name: {content: 'John Smith'}, status: {content: 'Employed'}},
      {id: {content: '2'}, name: {content: 'Randal White'}, status: {content: 'Unemployed'}},
      {id: {content: '3'}, name: {content: 'Stephanie Sandersaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'}, status: {content: 'Employed'}},
      {id: {content: '4'}, name: {content: 'Steve Brown'}, status: {content: 'Employed'}},
      {id: {content: '5'}, name: {content: 'Joyce Whitten'}, status: {content: 'Employed'}},
      {id: {content: '6'}, name: {content: 'Samuel Roberts'}, status: {content: 'Unemployed'}},
      {id: {content: '7'}, name: {content: 'Adam Moore'}, status: {content: 'Employed'}},
      {id: {content: '8'}, name: {content: 'Robert Brown'}, status: {content: 'Employed'}},
      {id: {content: '9'}, name: {content: 'Elizabeth Stevenson'}, status: {content: 'Employed'}},
      {id: {content: '10'}, name: {content: 'Zachary Dobb'}, status: {content: 'Employed'}}
    ];

    this.setState({height: e.target.value, rowData: rowData});
  }

  _onToggle(e, toggled) {
    let state = {};
    state[e.target.name] = toggled;
    this.setState(state);
  }
}

module.exports = TablePage;
