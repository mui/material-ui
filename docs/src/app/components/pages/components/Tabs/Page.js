import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import tabsReadmeText from './README';
import tabsExampleSimpleCode from '!raw!./ExampleSimple';
import TabsExampleSimple from './ExampleSimple';
import tabsExampleControlledCode from '!raw!./ExampleControlled';
import TabsExampleControlled from './ExampleControlled';
import tabsExampleSwipeableCode from '!raw!./ExampleSwipeable';
import TabsExampleSwipeable from './ExampleSwipeable';
import tabsExampleIconCode from '!raw!./ExampleIcon';
import TabsExampleIcon from './ExampleIcon';
import tabsExampleIconTextCode from '!raw!./ExampleIconText';
import TabsExampleIconText from './ExampleIconText';
import tabsCode from '!raw!material-ui/lib/Tabs/Tabs';
import tabCode from '!raw!material-ui/lib/Tabs/Tab';

const descriptions = {
  simple: 'A simple example of Tabs. The third tab demonstrates the `onActive` property of `Tab`.',
  controlled: 'An example of controlled tabs. The selected tab is handled through state and callbacks in the parent ' +
  '(example) component.',
  swipeable: 'This example integrates the [react-swipeable-views]' +
  '(https://github.com/oliviertassinari/react-swipeable-views) component with Tabs, animating the Tab transition, ' +
  'and allowing tabs to be swiped on touch devices.',
  icon: 'An example of tabs with icon.',
  iconText: 'An example of tabs with icon and text.',
};

const TabsPage = () => (
  <div>
    <Title render={(previousTitle) => `Tabs - ${previousTitle}`} />
    <MarkdownElement text={tabsReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={tabsExampleSimpleCode}
    >
      <TabsExampleSimple />
    </CodeExample>
    <CodeExample
      title="Controlled example"
      description={descriptions.controlled}
      code={tabsExampleControlledCode}
    >
      <TabsExampleControlled />
    </CodeExample>
    <CodeExample
      title="Swipeable example"
      description={descriptions.swipeable}
      code={tabsExampleSwipeableCode}
    >
      <TabsExampleSwipeable />
    </CodeExample>
    <CodeExample
      title="Icon example"
      description={descriptions.icon}
      code={tabsExampleIconCode}
    >
      <TabsExampleIcon />
    </CodeExample>
    <CodeExample
      title="Icon and text example"
      description={descriptions.iconText}
      code={tabsExampleIconTextCode}
    >
      <TabsExampleIconText />
    </CodeExample>
    <PropTypeDescription code={tabsCode} header="### Tabs Properties" />
    <PropTypeDescription code={tabCode} header="### Tab Properties" />
  </div>
);

export default TabsPage;
