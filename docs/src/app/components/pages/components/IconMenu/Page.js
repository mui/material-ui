import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import iconMenuReadmeText from './README';
import IconMenuExampleSimple from './ExampleSimple';
import iconMenuExampleSimpleCode from '!raw!./ExampleSimple';
import IconMenuExampleControlled from './ExampleControlled';
import iconMenuExampleControlledCode from '!raw!./ExampleControlled';
import IconMenuExampleScrollable from './ExampleScrollable';
import iconMenuExampleScrollableCode from '!raw!./ExampleScrollable';
import IconMenuExampleNested from './ExampleNested';
import iconMenuExampleNestedCode from '!raw!./ExampleNested';
import iconMenuCode from '!raw!material-ui/IconMenu/IconMenu';

const IconMenusPage = () => (
  <div>
    <Title render={(previousTitle) => `Icon Menu - ${previousTitle}`} />
    <MarkdownElement text={iconMenuReadmeText} />
    <CodeExample
      title="Icon Menu positioning"
      code={iconMenuExampleSimpleCode}
    >
      <IconMenuExampleSimple />
    </CodeExample>
    <CodeExample
      title="Controlled Icon Menus"
      code={iconMenuExampleControlledCode}
    >
      <IconMenuExampleControlled />
    </CodeExample>
    <CodeExample
      title="Scrollable Icon Menu"
      code={iconMenuExampleScrollableCode}
    >
      <IconMenuExampleScrollable />
    </CodeExample>
    <CodeExample
      title="Nested Icon Menus"
      code={iconMenuExampleNestedCode}
    >
      <IconMenuExampleNested />
    </CodeExample>
    <PropTypeDescription code={iconMenuCode} />
  </div>
);

export default IconMenusPage;
