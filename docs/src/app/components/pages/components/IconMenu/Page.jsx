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

const IconMenusPage = () => (
  <div>
    <MarkdownElement text={iconMenuReadmeText} />
    <CodeExample code={iconMenuExampleSimpleCode}>
      <IconMenuExampleSimple />
    </CodeExample>
    <CodeExample code={iconMenuExampleControlledCode}>
      <IconMenuExampleControlled />
    </CodeExample>
    <CodeExample code={iconMenuExampleScrollableCode}>
      <IconMenuExampleScrollable />
    </CodeExample>
    <PropTypeDescription code={iconMenuCode}/>
  </div>
);

export default IconMenusPage;
