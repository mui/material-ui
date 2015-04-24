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

    var desc = 'Toolbars are collections of components stacked horizontally ' +
               'against each other. Toolbars provide greater versatility than ' +
               'appBars. AppBars are a subset of toolbars. The following ' + 
               'toolbar components can help organize your layout. Note that ' +
               'every component listed here (including Toolbar) have a style ' +
               'prop which overrides the inline-styles of their root element.'

    var componentInfo = [
      {
        name: 'ToolbarGroup',
          infoArray: [
            {
              name: 'Description',
              desc: 'Toolbar Group contains a collection of components for you. ' +
                    'It is recommended that all components in a Toolbar are ' +
                    'contained within a ToolbarGroup.'
            },
            {
              name: 'float',
              type: 'string',
              header: 'optional',
              desc: 'Optional pull "left" or "right"'
            }
          ]
      },
      {
        name: 'ToolbarSeparator',
          infoArray: [
            {
              name: 'Description',
              desc: 'A vertical bar used to separate groups of components. It ' +
                    'is used to easily organize components.'
            }
          ]
      },
      {
        name: 'ToolbarTitle',
          infoArray: [
            {
              name: 'Description',
              desc: 'Simply a string of text that is displayed in the Toolbar.'
            },
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
        desc={desc}
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
