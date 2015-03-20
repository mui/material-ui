var React = require('react');
var CodeExample = require('../../code-example/code-example.jsx');
var mui = require('mui');
var Router = require('react-router');
var ComponentDoc = require('../../component-doc.jsx');
var RouteHandler = Router.RouteHandler;
var Table = mui.Table;
var TextField = mui.TextField;
var Toggle = mui.Toggle;

var TablePage = React.createClass({

  mixins: [Router.Navigation, Router.State],
  
  getInitialState: function() {
    return {
      stripedRows: false,
      showRowHover: false,
      selectEnabled: false,
      multiSelectEnabled: false,
      height: '300px'
    };
  },

  render: function(){
    var code =  '';

    var desc = '';

    var componentInfo = [
      {
        name: 'Table Props',
        infoArray: [
          {
            name: 'initialSelectedIndex',
            type: 'number',
            header: 'optional',
            desc: 'Specify initial visible tab index. Initial selected index is set by default to 0. If initialSelectedIndex is set but larger than the total amount of specified tabs, initialSelectedIndex will revert back to default'
          }
        ]
      }
    ];
    
    var colHeaders = {id: {displayName: 'ID'}, name: {displayName: 'Name'}, status: {displayName: 'Status'}};
    var colOrder = ['id', 'name', 'status'];
    var rowData = [
      {id: {content: '1'}, name: {content: 'John Smith'}, status: {content: 'Employed'}},
      {id: {content: '2'}, name: {content: 'Randal White'}, status: {content: 'Unemployed'}},
      {id: {content: '3'}, name: {content: 'Stephanie Sanders'}, status: {content: 'Employed'}},
      {id: {content: '4'}, name: {content: 'Steve Brown'}, status: {content: 'Employed'}},
      {id: {content: '5'}, name: {content: 'Joyce Whitten'}, status: {content: 'Employed'}},
      {id: {content: '6'}, name: {content: 'Samuel Roberts'}, status: {content: 'Unemployed'}},
      {id: {content: '7'}, name: {content: 'Adam Moore'}, status: {content: 'Employed'}},
      {id: {content: '8'}, name: {content: 'Robert Brown'}, status: {content: 'Employed'}},
      {id: {content: '9'}, name: {content: 'Elizabeth Stevenson'}, status: {content: 'Employed'}},
      {id: {content: '10'}, name: {content: 'Zachary Dobb'}, status: {content: 'Employed'}}
    ];

    var propContainerStyle = {
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
            columnHeaders={colHeaders} 
            columnOrder={colOrder} 
            rowData={rowData} 
            height={this.state.height} 
            stripedRows={this.state.stripedRows}
            showRowHover={this.state.showRowHover}
            selectEnabled={this.state.selectEnabled}
            multiSelectEnabled={this.state.multiSelectEnabled}/>
            
          <div style={propContainerStyle}>
            <h3>Table Properties</h3>
            <TextField 
              floatingLabelText='Table Body Height'
              defaultValue={this.state.height}
              onChange={this._onChange} />
            
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
              name='selectEnabled'
              label='Selectable'
              onToggle={this._onToggle}
              defaultToggled={this.state.selectEnabled} />
            
            <Toggle
              name='multiSelectEnabled'
              label='Multi-Selectable'
              onToggle={this._onToggle}
              defaultToggled={this.state.multiSelectEnabled} />
            </div>
        </div>

      </ComponentDoc>
    );
  },
  
  _onChange: function(e) {
    this.setState({height: e.target.value});
  },
  
  _onToggle: function(e, toggled) {
    var state = {};
    state[e.target.name] = toggled;
    this.setState(state);
  }
});

module.exports = TablePage;
