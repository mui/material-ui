import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import menuReadmeText from 'material-ui/Menu/examples/README';
import MenuExampleSimple from 'material-ui/Menu/examples/ExampleSimple';
import menuExampleSimpleCode from '!raw!material-ui/Menu/examples/ExampleSimple';
import MenuExampleDisable from 'material-ui/Menu/examples/ExampleDisable';
import menuExampleDisableCode from '!raw!material-ui/Menu/examples/ExampleDisable';
import MenuExampleIcons from 'material-ui/Menu/examples/ExampleIcons';
import menuExampleIconsCode from '!raw!material-ui/Menu/examples/ExampleIcons';
import MenuExampleSecondary from 'material-ui/Menu/examples/ExampleSecondary';
import menuExampleSecondaryCode from '!raw!material-ui/Menu/examples/ExampleSecondary';
import MenuExampleNested from 'material-ui/Menu/examples/ExampleNested';
import menuExampleNestedCode from '!raw!material-ui/Menu/examples/ExampleNested';
import menuCode from '!raw!material-ui/lib/Menu/Menu';
import menuItemCode from '!raw!material-ui/lib/MenuItem/MenuItem';

const descriptions = {
  simple: 'Two simple examples. The menu widths adjusts to accommodate the content in keyline increments.',
  disabled: 'The `disabled` property disables a `MenuItem`. ' +
  '`Menu` supports a more compact vertical spacing using the `desktop` property. ' +
  'The [Divider](/#/components/divider) can be used to separate `MenuItems`.',
  icons: '`MenuItem` supports icons through the `leftIcon` and `rightIcon` properties.',
  secondary: '`MenuItem` supports a `secondaryText` property.',
  nested: 'Cascading menus can be configured using the `menuItems` property of the `MenuItem` component.',
};

const MenuPage = () => (
  <div>
    <Title render={(previousTitle) => `Menu - ${previousTitle}`} />
    <MarkdownElement text={menuReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={menuExampleSimpleCode}
    >
      <MenuExampleSimple />
    </CodeExample>
    <CodeExample
      title="Disabled items"
      description={descriptions.disabled}
      code={menuExampleDisableCode}
    >
      <MenuExampleDisable />
    </CodeExample>
    <CodeExample
      title="Icons"
      description={descriptions.icons}
      code={menuExampleIconsCode}
    >
      <MenuExampleIcons />
    </CodeExample>
    <CodeExample
      title="Secondary text"
      description={descriptions.secondary}
      code={menuExampleSecondaryCode}
    >
      <MenuExampleSecondary />
    </CodeExample>
    <CodeExample
      title="Nested menus"
      description={descriptions.nested}
      code={menuExampleNestedCode}
    >
      <MenuExampleNested />
    </CodeExample>
    <PropTypeDescription header="### Menu Properties" code={menuCode} />
    <PropTypeDescription header="### MenuItem Properties" code={menuItemCode} />
  </div>
);

export default MenuPage;
