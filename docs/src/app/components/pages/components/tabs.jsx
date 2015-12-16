import React from 'react';
import tabsCode from '!raw!material-ui/lib/tabs/tabs';
import tabsText from '../../Tabs/Tabs';
import tabCode from '!raw!material-ui/lib/tabs/tab';
import tabText from '../../Tabs/Tab';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import TabsExampleSimple from '../../Tabs/ExampleSimple';
import tabsExampleSimpleCode from '!raw!../../Tabs/ExampleSimple';
import TabsExampleControlled from '../../Tabs/ExampleControlled';
import tabsExampleControlledCode from '!raw!../../Tabs/ExampleControlled';
import TabsExampleSwipeable from '../../Tabs/ExampleSwipeable';
import tabsExampleSwipeableCode from '!raw!../../Tabs/ExampleSwipeable';
import MarkdownElement from '../../MarkdownElement';
import tabsReadmeText from '../../Tabs/README';

const TabsPage = () => {
  return (
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
};

export default TabsPage;
