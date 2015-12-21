import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';
import leftNavReadmeText from './README';
import LeftNavSimpleExample from './ExampleSimple';
import leftNavSimpleExampleCode from '!raw!./ExampleSimple';
import LeftNavUndockedExample from './ExampleUndocked';
import leftNavUndockedExampleCode from '!raw!./ExampleUndocked';
import LeftNavOpenRightExample from './ExampleOpenRight';
import leftNavOpenRightExampleCode from '!raw!./ExampleOpenRight';
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
