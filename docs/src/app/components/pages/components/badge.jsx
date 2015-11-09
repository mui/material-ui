const React = require('react');
const { FontIcon, IconButton, Badge, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');
const Code = require('badge-code');
const CodeExample = require('../../code-example/code-example');
const NotificationsIcon = require('svg-icons/social/notifications');
const ShoppingCartIcon = require('svg-icons/action/shopping-cart');
const FolderIcon = require('svg-icons/file/folder-open');
const UploadIcon = require('svg-icons/file/cloud-upload');
const CodeBlock = require('../../code-example/code-block');

export default class BadgePage extends React.Component {
  constructor(props) {
    super(props);

    this.desc = 'This component generates a small badge to the top-right of it\'s child(ren)';

    this.componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'badgeContent',
            type: 'node',
            header: 'required',
            desc: 'This is the content rendered within the badge.',
          },
          {
            name: 'primary',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the badge will use the primary badge colors.',
          },
          {
            name: 'secondary',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, the badge will use the secondary badge colors.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the root element.',
          },
          {
            name: 'badgeStyle',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the badge element.',
          },
        ],
      },
    ];
  }

  render() {
    return (
      <ComponentDoc
        name="Badge"
        desc={this.desc}
        componentInfo={this.componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst Badge = require(\'material-ui/lib/badge\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          
          <Badge badgeContent={4} primary={true}>
            <NotificationsIcon />
          </Badge>

          <Badge badgeContent={10} secondary={true} badgeStyle={{top:12, right:12}}>
            <IconButton tooltip="Go To Cart">
              <ShoppingCartIcon/>
            </IconButton>
          </Badge>

          <Badge backgroundColor="#d8d8d8"
                 badgeContent={<IconButton tooltip="Backup"><UploadIcon/></IconButton>}>
            <FolderIcon />
          </Badge>

          <Badge badgeContent="&copy;" badgeStyle={{fontSize:20}}>
            <h3>Company Name</h3>
          </Badge>

        </CodeExample>
      </ComponentDoc>
    );
  }

}
