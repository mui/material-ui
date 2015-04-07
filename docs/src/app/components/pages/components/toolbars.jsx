var React = require('react');
var mui = require('mui');
var ComponentDoc = require('../../component-doc.jsx');

var {DropDownIcon, DropDownMenu, FontIcon, RaisedButton, Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} = mui;

class ToolbarPage extends React.Component {

  render() {

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
      '    <ToolbarTitle text="Options" />\n' +
      '    <FontIcon className="mui-icon-sort" />\n' +
      '    <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />\n' +
      '    <ToolbarSeparator/>\n' +
      '    <RaisedButton label="Create Broadcast" primary={true} />\n' +
      '  </ToolbarGroup>\n' +
      '</Toolbar>';

    var componentInfo = [
      {
        name: 'ToolbarGroup',
          infoArray: [
            {
              name: 'float',
              type: 'string',
              header: 'optional',
              desc: 'Optional pull "left" or "right"'
            }
          ]
      },
      {
        name: 'ToolbarTitle',
          infoArray: [
            {
              name: 'text',
              type: 'string',
              header: 'optional',
              desc: 'The text to be displayed for the element.'
            }
          ]
      },
    ];

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
        componentInfo={componentInfo}>

        <Toolbar>
          <ToolbarGroup key={0} float="left">
            <DropDownMenu menuItems={filterOptions} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <ToolbarTitle text="Options" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <DropDownIcon iconClassName="muidocs-icon-navigation-expand-more" menuItems={iconMenuItems} />
            <ToolbarSeparator/>
            <RaisedButton label="Create Broadcast" primary={true} />
          </ToolbarGroup>
        </Toolbar>

      </ComponentDoc>
    );
  }

}

module.exports = ToolbarPage;
