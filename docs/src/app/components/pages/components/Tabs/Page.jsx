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
import tabsText from './Tabs';
import tabCode from '!raw!material-ui/lib/tabs/tab';
import tabText from './Tab';

const TabsPage = () => (
  <div>
    <MarkdownElement text={tabsReadmeText} />
    <CodeExample code={tabsExampleSimpleCode}>
      <TabsExampleSimple />
    </CodeExample>
    <CodeExample code={tabsExampleControlledCode}>
      <TabsExampleControlled />
    </CodeExample>
    <CodeExample code={tabsExampleSwipeableCode}>
      <TabsExampleSwipeable />
    </CodeExample>
    <PropTypeDescription
      code={tabsCode}
      header={tabsText} />
    <PropTypeDescription
      code={tabCode}
      header={tabText} />
  </div>
);

export default TabsPage;
