import React from 'react';
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
import tabsCode from '!raw!material-ui/lib/tabs/tabs';
import tabCode from '!raw!material-ui/lib/tabs/tab';

const descriptions = {
  simple: 'A simple example of Tabs. The third tab demonstrates the `onActive` property of `Tab`.',
  controlled: 'An example of controlled tabs. The selected tab is handled through state and callbacks in the parent ' +
  '(example) component.',
  swipeable: 'This example integrates the [react-swipeable-views]' +
  '(https://github.com/oliviertassinari/react-swipeable-views) component with Tabs, animating the Tab transition, ' +
  'and allowing tabs to be swiped on touch devices.',
};

const TabsPage = () => (
  <div>
    <MarkdownElement text={tabsReadmeText} />
    <CodeExample
      title="Simple Example"
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
    <PropTypeDescription code={tabsCode} header="### Tabs Properties" />
    <PropTypeDescription code={tabCode} header="### Tab Properties" />
  </div>
);

export default TabsPage;
