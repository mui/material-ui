import React from 'react';
import MarkdownElement from '../../MarkdownElement';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import dropDownMenuReadmeText from './DropDownMenu/README';
import DropDownMenuSimpleExample from './DropDownMenu/ExampleSimple';
import dropDownMenuSimpleExampleCode from '!raw!./DropDownMenu/ExampleSimple';
import DropDownMenuLongMenuExample from './DropDownMenu/ExampleLongMenu';
import dropDownMenuLongMenuExampleCode from '!raw!./DropDownMenu/ExampleLongMenu';
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
        <PropTypeDescription code={dropDownMenuCode}/>
      </div>
    );
  }
}
