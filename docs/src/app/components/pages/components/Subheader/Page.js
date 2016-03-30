import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import subheaderReadmeText from 'material-ui/Subheader/examples/README';
import listExampleChatCode from '!raw!material-ui/List/examples/ExampleChat';
import ListExampleChat from 'material-ui/List/examples/ExampleChat';
import listExampleFoldersCode from '!raw!material-ui/List/examples/ExampleFolders';
import ListExampleFolders from 'material-ui/List/examples/ExampleFolders';
import gridListExampleSimpleCode from '!raw!material-ui/GridList/examples/ExampleSimple';
import GridListExampleSimple from 'material-ui/GridList/examples/ExampleSimple';
import subheaderCode from '!raw!material-ui/lib/Subheader/Subheader';

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
