import React from 'react';
import {FontIcon, IconButton, Badge, Paper} from 'material-ui';
import ComponentDoc from '../../component-doc';
import Code from 'badge-code';
import CodeExample from '../../code-example/code-example';
import NotificationsIcon from 'svg-icons/social/notifications';
import ShoppingCartIcon from 'svg-icons/action/shopping-cart';
import FolderIcon from 'svg-icons/file/folder-open';
import UploadIcon from 'svg-icons/file/cloud-upload';
import CodeBlock from '../../code-example/code-block';

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
            `//Import statement:
import Badge from 'material-ui/lib/badge';

//See material-ui/lib/index.js for more
            `
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
