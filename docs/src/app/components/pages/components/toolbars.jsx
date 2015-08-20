let React = require('react');
let mui = require('material-ui');
let ComponentDoc = require('../../component-doc');

let {
  DropDownIcon,
  DropDownMenu,
  FontIcon,
  RaisedButton,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} = mui;
let Code = require('toolbars-code');
let CodeExample = require('../../code-example/code-example');


class ToolbarPage extends React.Component {

  render() {

    let desc = 'Toolbars are collections of components stacked horizontally ' +
               'against each other. Toolbars provide greater versatility than ' +
               'appBars. AppBars are a subset of toolbars. The following ' +
               'toolbar components can help organize your layout. Note that ' +
               'every component listed here (including Toolbar) have a style ' +
               'prop which overrides the inline-styles of their root element.'

    let componentInfo = [
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

    let filterOptions = [
      { payload: '1', text: 'All Broadcasts' },
      { payload: '2', text: 'All Voice' },
      { payload: '3', text: 'All Text' },
      { payload: '4', text: 'Complete Voice' },
      { payload: '5', text: 'Complete Text' },
      { payload: '6', text: 'Active Voice' },
      { payload: '7', text: 'Active Text' },
    ];
    let iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' }
    ];

    return (
      <ComponentDoc
        name="Toolbars"
        desc={desc}
        componentInfo={componentInfo}>
        <CodeExample code={Code}>
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
        </CodeExample>
      </ComponentDoc>
    );
  }

}

module.exports = ToolbarPage;
