import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import toolbarReadmeText from './README';
import toolbarExampleSimpleCode from '!raw!./ExampleSimple';
import ToolbarExampleSimple from './ExampleSimple';

import toolbarCode from '!raw!material-ui/Toolbar/Toolbar';
import toolbarText from './Toolbar';
import toolbarGroupCode from '!raw!material-ui/Toolbar/ToolbarGroup';
import toolbarGroupText from './ToolbarGroup';
import toolbarSeparatorCode from '!raw!material-ui/Toolbar/ToolbarSeparator';
import toolbarSeparatorText from './ToolbarSeparator';
import toolbarTitleCode from '!raw!material-ui/Toolbar/toolbarTitle';
import toolbarTitleText from './ToolbarTitle';

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
