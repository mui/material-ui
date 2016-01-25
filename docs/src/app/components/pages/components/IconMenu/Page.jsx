import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import iconMenuReadmeText from './README';
import iconMenuCode from '!raw!material-ui/lib/menus/icon-menu';
import IconMenuExampleSimple from './ExampleSimple';
import iconMenuExampleSimpleCode from '!raw!./ExampleSimple';
import IconMenuExampleControlled from './ExampleControlled';
import iconMenuExampleControlledCode from '!raw!./ExampleControlled';
import IconMenuExampleScrollable from './ExampleScrollable';
import iconMenuExampleScrollableCode from '!raw!./ExampleScrollable';

const descriptions = {
  simple: 'Simple Icon Menus demonstrating some of the layouts possible using the `anchorOrigin` and `' +
  'targetOrigin` properties.',
  controlled: 'Two controlled examples, the first allowing a single selection, the second multiple selections.',
  scrollable: 'The `maxHeight` property limits the height of the menu, above which it will be scrollable.',
};

const IconMenusPage = () => (
  <div>
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
    <PropTypeDescription code={iconMenuCode} />
  </div>
);

export default IconMenusPage;
