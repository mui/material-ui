import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import drawerReadmeText from './README';
import DrawerExampleSimple from './ExampleSimple';
import drawerExampleSimpleCode from '!raw!./ExampleSimple';
import DrawerExampleUndocked from './ExampleUndocked';
import drawerExampleUndockedCode from '!raw!./ExampleUndocked';
import DrawerExampleOpenSecondary from './ExampleOpenSecondary';
import drawerExampleOpenSecondaryCode from '!raw!./ExampleOpenSecondary';
import drawerCode from '!raw!material-ui/Drawer/Drawer';

const DrawerPage = () => (
  <div>
    <Title render={(previousTitle) => `Drawer - ${previousTitle}`} />
    <MarkdownElement text={drawerReadmeText} />
    <CodeExample
      title="Docked example"
      code={drawerExampleSimpleCode}
    >
      <DrawerExampleSimple />
    </CodeExample>
    <CodeExample
      title="Undocked example"
      code={drawerExampleUndockedCode}
    >
      <DrawerExampleUndocked />
    </CodeExample>
    <CodeExample
      title="Open secondary example"
      code={drawerExampleOpenSecondaryCode}
    >
      <DrawerExampleOpenSecondary />
    </CodeExample>
    <PropTypeDescription code={drawerCode} />
  </div>
);

export default DrawerPage;
