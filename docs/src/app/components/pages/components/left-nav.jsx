import React from 'react';
import MarkdownElement from '../../MarkdownElement';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import leftNavReadmeText from '../../LeftNav/README';
import LeftNavSimpleExample from '../../LeftNav/ExampleSimple';
import leftNavSimpleExampleCode from '!raw!../../LeftNav/ExampleSimple';
import LeftNavUndockedExample from '../../LeftNav/ExampleUndocked';
import leftNavUndockedExampleCode from '!raw!../../LeftNav/ExampleUndocked';
import LeftNavOpenRightExample from '../../LeftNav/ExampleOpenRight';
import leftNavOpenRightExampleCode from '!raw!../../LeftNav/ExampleOpenRight';
import leftNavCode from '!raw!material-ui/lib/left-nav';

export default class LeftNavPage extends React.Component {
  render() {
    return (
      <div>
        <MarkdownElement text={leftNavReadmeText} />
        <CodeExample code={leftNavSimpleExampleCode}>
          <LeftNavSimpleExample />
        </CodeExample>
        <CodeExample code={leftNavUndockedExampleCode}>
          <LeftNavUndockedExample />
        </CodeExample>
        <CodeExample code={leftNavOpenRightExampleCode}>
          <LeftNavOpenRightExample />
        </CodeExample>
        <PropTypeDescription code={leftNavCode}/>
      </div>
    );
  }
}
