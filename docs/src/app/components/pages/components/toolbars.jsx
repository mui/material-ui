var React = require('react');
var mui = require('mui');
var DropDownIcon = mui.DropDownIcon;
var DropDownMenu = mui.DropDownMenu;
var Icon = mui.Icon;
var RaisedButton = mui.RaisedButton;
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var ComponentDoc = require('../../component-doc.jsx');

var ToolbarPage = React.createClass({

  render: function() {

    var code = 
      'var filterOptions = [\n' +
      '  { payload: \'1\', text: \'All Broadcasts\' },\n' +
      '  { payload: \'2\', text: \'All Voice\' },\n' +
      '  { payload: \'3\', text: \'All Text\' },\n' +
      '  { payload: \'4\', text: \'Complete Voice\' },\n' +
      '  { payload: \'5\', text: \'Complete Text\' },\n' +
      '  { payload: \'6\', text: \'Active Voice\' },\n' +
      '  { payload: \'7\', text: \'Active Text\' },\n' +
      '];\n' +
      'var iconMenuItems = [\n' +
      '  { payload: \'1\', text: \'Download\' },\n' +
      '  { payload: \'2\', text: \'More Info\' }\n' +
      '];\n\n' +
      '<Toolbar>\n' + 
      '  <ToolbarGroup key={0} float="left">\n' +
      '    <DropDownMenu menuItems={filterOptions} />\n' +
      '  </ToolbarGroup>\n' +
      '  <ToolbarGroup key={1} float="right">\n' +
      '    <Icon icon="mui-icon-pie" />\n' +
      '    <Icon icon="mui-icon-sort" />\n' +
      '    <DropDownIcon icon="navigation-expand-more" menuItems={iconMenuItems} />\n' +
      '    <span className="mui-toolbar-separator">&nbsp;</span>\n' +
      '    <RaisedButton label="Create Broadcast" primary={true} />\n' +
      '  </ToolbarGroup>\n' +
      '</Toolbar>';

    var componentInfo = [{
      name: 'ToolbarGroup',
        infoArray: [
          {
            name: 'float',
            type: 'string',
            header: 'optional',
            desc: 'Optional pull "left" or "right"'
          }
        ]
    }];

    var filterOptions = [
      { payload: '1', text: 'All Broadcasts' },
      { payload: '2', text: 'All Voice' },
      { payload: '3', text: 'All Text' },
      { payload: '4', text: 'Complete Voice' },
      { payload: '5', text: 'Complete Text' },
      { payload: '6', text: 'Active Voice' },
      { payload: '7', text: 'Active Text' },
    ];
    var iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' }
    ];

    return (
      <ComponentDoc
        name="Toolbars"
        code={code}
        componentInfo={componentInfo}
      >

        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <DropDownMenu menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <Icon icon="mui-icon-pie" />
            <Icon icon="mui-icon-sort" />
            <DropDownIcon icon="navigation-expand-more" menuItems={iconMenuItems} />
            <span className="mui-toolbar-separator">&nbsp;</span>
            <RaisedButton label="Create Broadcast" primary={true} />
          </ToolbarGroup>
        </Toolbar>

      </ComponentDoc>
    );
  }

});

module.exports = ToolbarPage;
