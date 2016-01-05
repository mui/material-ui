import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import listReadmeText from './README';
import selectableHelpText from './SelectableHelp';
import listCode from '!raw!material-ui/lib/lists/list';
import listItemCode from '!raw!material-ui/lib/lists/list-item';
import listExampleSimpleCode from '!raw!./ExampleSimple.jsx';
import ListExampleSimple from './ExampleSimple.jsx';
import listExampleChatCode from '!raw!./ExampleChat.jsx';
import ListExampleChat from './ExampleChat.jsx';
import listExampleContactsCode from '!raw!./ExampleContacts.jsx';
import ListExampleContacts from './ExampleContacts.jsx';
import listExampleFoldersCode from '!raw!./ExampleFolders.jsx';
import ListExampleFolders from './ExampleFolders.jsx';
import listExampleNestedCode from '!raw!./ExampleNested.jsx';
import ListExampleNested from './ExampleNested.jsx';
//ExampleNested causes warning!
import listExampleSettingsCode from '!raw!./ExampleSettings.jsx';
import ListExampleSettings from './ExampleSettings.jsx';
import listExamplePhoneCode from '!raw!./ExamplePhone.jsx';
import ListExamplePhone from './ExamplePhone.jsx';
import listExampleMessagesCode from '!raw!./ExampleMessages.jsx';
import ListExampleMessages from './ExampleMessages.jsx';
import listExampleSelectableCode from '!raw!./ExampleSelectable.jsx';
import ListExampleSelectable from './ExampleSelectable.jsx';

const ListPage = () => (
  <div>
    <MarkdownElement text={listReadmeText} />
    <CodeExample code={listExampleSimpleCode}>
      <ListExampleSimple />
    </CodeExample>
    <CodeExample code={listExampleChatCode}>
      <ListExampleChat />
    </CodeExample>
    <CodeExample code={listExampleContactsCode}>
      <ListExampleContacts />
    </CodeExample>
    <CodeExample code={listExampleFoldersCode}>
      <ListExampleFolders />
    </CodeExample>
    <CodeExample code={listExampleNestedCode}>
      <ListExampleNested />
    </CodeExample>
    <CodeExample code={listExampleSettingsCode}>
      <ListExampleSettings />
    </CodeExample>
    <CodeExample code={listExamplePhoneCode}>
      <ListExamplePhone />
    </CodeExample>
    <CodeExample code={listExampleMessagesCode}>
      <ListExampleMessages />
    </CodeExample>
    <CodeExample code={listExampleSelectableCode}>
      <ListExampleSelectable />
    </CodeExample>
    <MarkdownElement text={selectableHelpText} />
    <PropTypeDescription code={listCode} />
    <PropTypeDescription code={listItemCode} />
  </div>

);

export default ListPage;
