import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import drawerReadmeText from './README';
import DrawerSimpleExample from './ExampleSimple';
import drawerSimpleExampleCode from '!raw!./ExampleSimple';
import DrawerUndockedExample from './ExampleUndocked';
import drawerUndockedExampleCode from '!raw!./ExampleUndocked';
import DrawerOpenSecondaryExample from './ExampleOpenSecondary';
import drawerOpenSecondaryExampleCode from '!raw!./ExampleOpenSecondary';
import drawerCode from '!raw!material-ui/lib/Drawer/Drawer';

const descriptions = {
  simple: 'A simple controlled `Drawer`. The Drawer is `docked` by default, ' +
  'remaining open unless closed through the `open` prop.',
  undocked: 'An undocked controlled `Drawer` with custom width. ' +
  'The Drawer can be cancelled by clicking the overlay or pressing the Esc key. ' +
  'It closes when an item is selected, handled by controlling the `open` prop.',
  right: 'The `openSecondary` prop allows the Drawer to open on the opposite side.',
};

const DrawerPage = () => (
  <div>
    <Title render={(previousTitle) => `Drawer - ${previousTitle}`} />
    <MarkdownElement text={drawerReadmeText} />
    <CodeExample
      title="Docked example"
      description={descriptions.simple}
      code={drawerSimpleExampleCode}
    >
      <DrawerSimpleExample />
    </CodeExample>
    <CodeExample
      title="Undocked example"
      description={descriptions.undocked}
      code={drawerUndockedExampleCode}
    >
      <DrawerUndockedExample />
    </CodeExample>
    <CodeExample
      title="Open secondary example"
      description={descriptions.right}
      code={drawerOpenSecondaryExampleCode}
    >
      <DrawerOpenSecondaryExample />
    </CodeExample>
    <PropTypeDescription code={drawerCode} />
  </div>
);

export default DrawerPage;
