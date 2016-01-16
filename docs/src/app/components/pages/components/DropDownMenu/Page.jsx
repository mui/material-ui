import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dropDownMenuReadmeText from './README';
import DropDownMenuSimpleExample from './ExampleSimple';
import dropDownMenuSimpleExampleCode from '!raw!./ExampleSimple';
import DropDownMenuLongMenuExample from './ExampleLongMenu';
import dropDownMenuLongMenuExampleCode from '!raw!./ExampleLongMenu';
import DropDownMenuLabeledExample from './ExampleLabeled';
import dropDownMenuLabeledExampleCode from '!raw!./ExampleLabeled';
import dropDownMenuCode from '!raw!material-ui/lib/DropDownMenu/DropDownMenu';

const descriptions = {
  simple: '`DropDownMenu` is implemented as a controlled component, ' +
  'with the current selection set through the `value` prop.',
  long: 'With `maxHeight` set, the menu will be scrollable if the number of items causes the height ' +
  'to exceed this limit.',
  labeled: 'With a `label` applied to each `MenuItem`, `DropDownMenu` displays a complementary description ' +
  'of the selected item.',
};

const DropDownMenuPage = () => (
  <div>
    <MarkdownElement text={dropDownMenuReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={dropDownMenuSimpleExampleCode}
    >
      <DropDownMenuSimpleExample />
    </CodeExample>
    <CodeExample
      title="Long example"
      description={descriptions.long}
      code={dropDownMenuLongMenuExampleCode}
    >
      <DropDownMenuLongMenuExample />
    </CodeExample>
    <CodeExample
      title="Labeled example"
      description={descriptions.labeled}
      code={dropDownMenuLabeledExampleCode}
    >
      <DropDownMenuLabeledExample />
    </CodeExample>
    <PropTypeDescription code={dropDownMenuCode} />
  </div>
);

export default DropDownMenuPage;
