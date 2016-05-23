import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import subheaderReadmeText from './README';
import listExampleChatCode from '!raw!../List/ExampleChat';
import ListExampleChat from '../List/ExampleChat';
import listExampleFoldersCode from '!raw!../List/ExampleFolders';
import ListExampleFolders from '../List/ExampleFolders';
import gridListExampleSimpleCode from '!raw!../GridList/ExampleSimple';
import GridListExampleSimple from '../GridList/ExampleSimple';
import subheaderCode from '!raw!material-ui/Subheader/Subheader';

const descriptions = {
  simpleList: 'Subheader used in a simple [List](/#/components/list).',
  inset: 'Inset Subheader used in a [List](/#/components/list).',
  simpleGridList: 'Subheader used in a [GridList](/#/components/grid-list).',
};

const SubheaderPage = () => (
  <div>
    <Title render={(previousTitle) => `Subheader - ${previousTitle}`} />
    <MarkdownElement text={subheaderReadmeText} />
    <CodeExample
      title="Simple Usage with List"
      description={descriptions.simpleList}
      code={listExampleChatCode}
    >
      <ListExampleChat />
    </CodeExample>
    <CodeExample
      title="Inset Example"
      description={descriptions.inset}
      code={listExampleFoldersCode}
    >
      <ListExampleFolders />
    </CodeExample>
    <CodeExample
      title="Simple Usage with GridList"
      description={descriptions.simpleGridList}
      code={gridListExampleSimpleCode}
    >
      <GridListExampleSimple />
    </CodeExample>
    <PropTypeDescription code={subheaderCode} />
  </div>
);

export default SubheaderPage;
