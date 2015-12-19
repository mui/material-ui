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

export default class LeftNavPage extends React.Component {
  render() {
    return (
      <div>
        <MarkdownElement text={dropDownMenuReadmeText} />
        <CodeExample code={dropDownMenuSimpleExampleCode}>
          <DropDownMenuSimpleExample />
        </CodeExample>
        <CodeExample code={dropDownMenuLongMenuExampleCode}>
          <DropDownMenuLongMenuExample />
        </CodeExample>
        <CodeExample code={dropDownMenuLabeledExampleCode}>
          <DropDownMenuLabeledExample />
        </CodeExample>
        <PropTypeDescription code={dropDownMenuCode}/>
      </div>
    );
  }
}
