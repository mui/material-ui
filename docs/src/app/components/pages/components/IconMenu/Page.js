import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import iconMenuReadmeText from 'material-ui/IconMenu/examples/README';
import IconMenuExampleSimple from 'material-ui/IconMenu/examples/ExampleSimple';
import iconMenuExampleSimpleCode from '!raw!material-ui/IconMenu/examples/ExampleSimple';
import IconMenuExampleControlled from 'material-ui/IconMenu/examples/ExampleControlled';
import iconMenuExampleControlledCode from '!raw!material-ui/IconMenu/examples/ExampleControlled';
import IconMenuExampleScrollable from 'material-ui/IconMenu/examples/ExampleScrollable';
import iconMenuExampleScrollableCode from '!raw!material-ui/IconMenu/examples/ExampleScrollable';
import IconMenuExampleNested from 'material-ui/IconMenu/examples/ExampleNested';
import iconMenuExampleNestedCode from '!raw!material-ui/IconMenu/examples/ExampleNested';
import iconMenuCode from '!raw!material-ui/lib/IconMenu/IconMenu';

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
