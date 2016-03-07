import React from 'react';
import Title from 'react-title-component';

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
import listExampleSettingsCode from '!raw!./ExampleSettings.jsx';
import ListExampleSettings from './ExampleSettings.jsx';
import listExamplePhoneCode from '!raw!./ExamplePhone.jsx';
import ListExamplePhone from './ExamplePhone.jsx';
import listExampleMessagesCode from '!raw!./ExampleMessages.jsx';
import ListExampleMessages from './ExampleMessages.jsx';
import listExampleSelectableCode from '!raw!./ExampleSelectable.jsx';
import ListExampleSelectable from './ExampleSelectable.jsx';

const descriptions = {
  simple: 'A simple `List` with left and right [SVG icons](/#/components/svg-icon).',
  chat: 'A chat list with Image [Avatars](/#/components/avatar) and [Subheader](/#/components/subheader).',
  contacts: 'Similar to the Chat List example, but with Text [Avatars](/#/components/avatar) ' +
  '(with transparent background) for section labeling, and an inset Divider. ',
  folders: 'The folder list uses Icon [Avatars](/#/components/avatar), and introduces `secondaryText`.',
  nested: 'This example introduces the ListItem `nestedItems` property. "Sent Mail" is `disabled`.',
  settings: 'ListItem supports [Checkbox](/#/components/checkbox) and [Toggle](/#/components/toggle) switches.',
  phone: '',
  messages: 'Two examples showing formatted secondary text. The second example demonstrates an ' +
  '[IconButton](/#/components/icon-button) with `tooltip`.',
  selectable: 'The selectable list wraps List in a Higher Order Component. See below for further details.',
};

const ListPage = () => (
  <div>
    <Title render={(previousTitle) => `List - ${previousTitle}`} />
    <MarkdownElement text={listReadmeText} />
    <CodeExample
      title="Simple list"
      description={descriptions.simple}
      code={listExampleSimpleCode}
    >
      <ListExampleSimple />
    </CodeExample>
    <CodeExample
      title="Chat list"
      description={descriptions.chat}
      code={listExampleChatCode}
    >
      <ListExampleChat />
    </CodeExample>
    <CodeExample
      title="Contact list"
      description={descriptions.contacts}
      code={listExampleContactsCode}
    >
      <ListExampleContacts />
    </CodeExample>
    <CodeExample
      title="Folder list"
      description={descriptions.folder}
      code={listExampleFoldersCode}
    >
      <ListExampleFolders />
    </CodeExample>
    <CodeExample
      title="Nested list"
      description={descriptions.nested}
      code={listExampleNestedCode}
    >
      <ListExampleNested />
    </CodeExample>
    <CodeExample
      title="Settings list"
      description={descriptions.settings}
      code={listExampleSettingsCode}
    >
      <ListExampleSettings />
    </CodeExample>
    <CodeExample
      title="Phone list"
      description={descriptions.phone}
      code={listExamplePhoneCode}
    >
      <ListExamplePhone />
    </CodeExample>
    <CodeExample
      title="Messages list"
      description={descriptions.messages}
      code={listExampleMessagesCode}
    >
      <ListExampleMessages />
    </CodeExample>
    <CodeExample
      title="Selectable list"
      description={descriptions.selectable}
      code={listExampleSelectableCode}
    >
      <ListExampleSelectable />
    </CodeExample>
    <MarkdownElement text={selectableHelpText} />
    <PropTypeDescription header="### List Properties" code={listCode} />
    <PropTypeDescription header="### ListItem Properties" code={listItemCode} />
  </div>

);

export default ListPage;
