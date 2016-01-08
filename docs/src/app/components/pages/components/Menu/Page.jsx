import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import menuReadmeText from './README';
import menuCode from '!raw!material-ui/lib/menus/menu';
import menuItemCode from '!raw!material-ui/lib/menus/menu-item';
import MenuExampleSimple from './ExampleSimple';
import menuExampleSimpleCode from '!raw!./ExampleSimple';
import MenuExampleDisable from './ExampleDisable';
import menuExampleDisableCode from '!raw!./ExampleDisable';
import MenuExampleIcons from './ExampleIcons';
import menuExampleIconsCode from '!raw!./ExampleIcons';
import MenuExampleSecondary from './ExampleSecondary';
import menuExampleSecondaryCode from '!raw!./ExampleSecondary';
import MenuExampleNested from './ExampleNested';
import menuExampleNestedCode from '!raw!./ExampleNested';

const MenuPage = () => (
  <div>
    <MarkdownElement text={menuReadmeText} />
    <CodeExample code={menuExampleSimpleCode}>
      <MenuExampleSimple />
    </CodeExample>
    <CodeExample code={menuExampleDisableCode}>
      <MenuExampleDisable />
    </CodeExample>
    <CodeExample code={menuExampleIconsCode}>
      <MenuExampleIcons />
    </CodeExample>
    <CodeExample code={menuExampleSecondaryCode}>
      <MenuExampleSecondary />
    </CodeExample>
    <CodeExample code={menuExampleNestedCode}>
      <MenuExampleNested />
    </CodeExample>
    <PropTypeDescription code={menuCode} header = "### Menu Properties"/>
    <PropTypeDescription code={menuItemCode} header="### MenuItem Properties"/>
  </div>
);

export default MenuPage;
