const React = require('react');
const { FontIcon, IconButton, NavigationMenu, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const ActionGrade = require('svg-icons/action/grade');
const ActionHome = require('svg-icons/action/home');
const Code = require('icon-buttons-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

export default class IconButtonsPage extends React.Component {

  render() {

    let desc = (
      <p>
        This component generates a button element and all props.
        Also, focus styles will happen on tab but not on click.
        There are three ways to add an icon:
        <br/>
        <ol>
          <li>
            For stylesheets: Set the prop "iconClassName" to the
            classname for you icon.
          </li>
          <li>
            For svg icons: Insert the svg component as a child of icon
            buttons. This is the method we are using. <a title="Source
            code for ActionGrade" href="https://github.com/callemall/material-ui/blob/master/src/svg-icons/action/grade.jsx">
            View our source</a> to see how ActionGrade was created
            using mui.SvgIcon.
          </li>
          <li>
            Alternative: You can also insert a <a title="Redirect to
            Material UI's FontIcon component" href="#/components/icons">
            FontIcon</a> component as a child of IconButton. This is
            similiar to how the iconClassName prop from method 1 is
            handled.
          </li>
          <li>
            Google Material Icons: Now also supported for iconButtons by passing "material-icons" in
            iconClassName prop.
          </li>
        </ol>
      </p>
    );

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'iconClassName',
            type: 'string',
            header: 'optional',
            desc: 'If you are using a stylesheet for your icons, enter the ' +
                  'class name for the icon to be used here.',
          },
          {
            name: 'iconStyle',
            type: 'object',
            header: 'optional',
            desc: 'Overrides the inline-styles of the icon element.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the button\'s root element.',
          },
          {
            name: 'tooltip',
            type: 'string',
            header: 'optional',
            desc: 'The tooltip text to show.',
          },
          {
            name: 'tooltipPosition',
            type: 'string',
            header: 'default: bottom-center',
            desc: 'Allows the tooltip to be viewed with different alignments: "bottom-center", "top-center", "bottom-right", "top-right", "bottom-left" and "top-left"',
          },
          {
            name: 'tooltipStyles',
            type: 'object',
            header: 'optional',
            desc: 'Allows modification of tooltip styles.',
          },
          {
            name: 'touch',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, this component will render the touch sized tooltip.',
          },
        ],
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            header: 'IconButton.onBlur(e)',
            desc: 'Callback function for when the component loses focus.',
          },
          {
            name: 'onFocus',
            header: 'IconButton.onFocus(e)',
            desc: 'Callback function for when the component gains focus.',
          },
        ],
      },
    ];

    return (
      <ComponentDoc
        name="Icon Buttons"
        desc={desc}
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst IconButton = require(\'material-ui/lib/icon-button\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <IconButton iconClassName="muidocs-icon-custom-github" tooltip="bottom-right"  tooltipPosition = "bottom-right" />

          <IconButton iconClassName="muidocs-icon-custom-github" tooltip="bottom-center" tooltipPosition = "bottom-center" />

          <IconButton iconClassName="muidocs-icon-custom-github" tooltip="bottom-left" tooltipPosition = "bottom-left" />

          <IconButton iconClassName="muidocs-icon-custom-github" tooltip="top-right" tooltipPosition = "top-right" />

          <IconButton iconClassName="muidocs-icon-custom-github" tooltip="top-center" tooltipPosition = "top-center" />

          <IconButton iconClassName="muidocs-icon-custom-github" tooltip="top-left" tooltipPosition = "top-left" />
          <br/><br/><br/><br/>

          <IconButton tooltip="bottom-right" touch={true} tooltipPosition="bottom-right">
            <ActionGrade/>
          </IconButton>

          <IconButton tooltip="bottom-center" touch={true} tooltipPosition="bottom-center">
            <ActionGrade/>
          </IconButton>

          <IconButton tooltip="bottom-left" touch={true} tooltipPosition="bottom-left">
            <ActionGrade/>
          </IconButton>

          <IconButton tooltip="top-right" touch={true} tooltipPosition="top-right">
            <ActionGrade/>
          </IconButton>

          <IconButton tooltip="top-center" touch={true} tooltipPosition="top-center">
            <ActionGrade/>
          </IconButton>

          <IconButton tooltip="top-left" touch={true} tooltipPosition="top-left">
            <ActionGrade/>
          </IconButton>
          <br/><br/><br/>

          <IconButton tooltip="Sort" disabled={true}>
            <FontIcon className="muidocs-icon-custom-sort"/>
          </IconButton>
          <br/><br/><br/>

          <IconButton iconClassName="material-icons" tooltip="Sky">settings_system_daydream</IconButton>
        </CodeExample>
      </ComponentDoc>
    );

  }

}
