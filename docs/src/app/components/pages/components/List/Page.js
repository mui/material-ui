import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import listReadmeText from './README';
import listExampleSimpleCode from '!raw!./ExampleSimple';
import ListExampleSimple from './ExampleSimple';
import listExampleChatCode from '!raw!./ExampleChat';
import ListExampleChat from './ExampleChat';
import listExampleContactsCode from '!raw!./ExampleContacts';
import ListExampleContacts from './ExampleContacts';
import listExampleFoldersCode from '!raw!./ExampleFolders';
import ListExampleFolders from './ExampleFolders';
import listExampleNestedCode from '!raw!./ExampleNested';
import ListExampleNested from './ExampleNested';
import listExampleSettingsCode from '!raw!./ExampleSettings';
import ListExampleSettings from './ExampleSettings';
import listExamplePhoneCode from '!raw!./ExamplePhone';
import ListExamplePhone from './ExamplePhone';
import listExampleMessagesCode from '!raw!./ExampleMessages';
import ListExampleMessages from './ExampleMessages';
import listExampleSelectableCode from '!raw!./ExampleSelectable';
import selectableHelpText from './SelectableHelp';
import ListExampleSelectable from './ExampleSelectable';
import listCode from '!raw!material-ui/lib/List/List';
import listItemCode from '!raw!material-ui/lib/List/ListItem';

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
