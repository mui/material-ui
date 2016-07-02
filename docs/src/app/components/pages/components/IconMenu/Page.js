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

const descriptions = {
  simple: 'Simple Icon Menus demonstrating some of the layouts possible using the `anchorOrigin` and `' +
  'targetOrigin` properties.',
  controlled: 'Three controlled examples, the first allowing a single selection, the second multiple selections,' +
    ' the third using internal state.',
  scrollable: 'The `maxHeight` property limits the height of the menu, above which it will be scrollable.',
  nested: 'Example of nested menus within an IconMenu.',
};

const IconMenusPage = () => (
  <div>
    <Title render={(previousTitle) => `Icon Menu - ${previousTitle}`} />
    <MarkdownElement text={iconMenuReadmeText} />
    <CodeExample
      title="Icon Menu positioning"
      description={descriptions.simple}
      code={iconMenuExampleSimpleCode}
    >
      <IconMenuExampleSimple />
    </CodeExample>
    <CodeExample
      title="Controlled Icon Menus"
      description={descriptions.controlled}
      code={iconMenuExampleControlledCode}
    >
      <IconMenuExampleControlled />
    </CodeExample>
    <CodeExample
      title="Scrollable Icon Menu"
      description={descriptions.scrollable}
      code={iconMenuExampleScrollableCode}
    >
      <IconMenuExampleScrollable />
    </CodeExample>
    <CodeExample
      title="Nested Icon Menus"
      description={descriptions.nested}
      code={iconMenuExampleNestedCode}
    >
      <IconMenuExampleNested />
    </CodeExample>
    <PropTypeDescription code={iconMenuCode} />
  </div>
);

export default IconMenusPage;
