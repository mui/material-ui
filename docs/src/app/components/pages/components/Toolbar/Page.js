import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import toolbarReadmeText from 'material-ui/Toolbar/examples/README';
import toolbarExampleSimpleCode from '!raw!material-ui/Toolbar/examples/ExampleSimple';
import ToolbarExampleSimple from 'material-ui/Toolbar/examples/ExampleSimple';

import toolbarCode from '!raw!material-ui/Toolbar/Toolbar';
import toolbarText from 'material-ui/Toolbar/examples/Toolbar';
import toolbarGroupCode from '!raw!material-ui/Toolbar/ToolbarGroup';
import toolbarGroupText from 'material-ui/Toolbar/examples/ToolbarGroup';
import toolbarSeparatorCode from '!raw!material-ui/Toolbar/ToolbarSeparator';
import toolbarSeparatorText from 'material-ui/Toolbar/examples/ToolbarSeparator';
import toolbarTitleCode from '!raw!material-ui/Toolbar/ToolbarTitle';
import toolbarTitleText from 'material-ui/Toolbar/examples/ToolbarTitle';

const description = 'An example Toolbar demonstrating the use of the available sub-components, and including a ' +
  'number of other Material-UI components, such as [Drop Down Menu](/#/components/dropdown-menu), [Font Icon]' +
  '(/#/components/font-icon), [Icon Menu](/#/components/icon-menu) and [Raised Button](/#/components/raised-button) .';

const ToolbarPage = () => (
  <div>
    <Title render={(previousTitle) => `Toolbar - ${previousTitle}`} />
    <MarkdownElement text={toolbarReadmeText} />
    <CodeExample description={description} code={toolbarExampleSimpleCode}>
      <ToolbarExampleSimple />
    </CodeExample>
    <PropTypeDescription code={toolbarCode} header={toolbarText} />
    <PropTypeDescription code={toolbarGroupCode} header={toolbarGroupText} />
    <PropTypeDescription code={toolbarSeparatorCode} header={toolbarSeparatorText} />
    <PropTypeDescription code={toolbarTitleCode} header={toolbarTitleText} />
  </div>
);

export default ToolbarPage;
