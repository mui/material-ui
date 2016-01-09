import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import textFieldReadmeText from './README';
import textFieldCode from '!raw!material-ui/lib/TextField/TextField';
import TextFieldExampleSimple from './ExampleSimple';
import textFieldExampleSimpleCode from '!raw!./ExampleSimple';
import TextFieldExampleCustomize from './ExampleCustomize';
import textFieldExampleCustomizeCode from '!raw!./ExampleCustomize';
import TextFieldExampleError from './ExampleError';
import textFieldExampleErrorCode from '!raw!./ExampleError';
import TextFieldExampleDisabled from './ExampleDisabled';
import textFieldExampleDisabledCode from '!raw!./ExampleDisabled';
import TextFieldExampleControlled from './ExampleControlled';
import textFieldExampleControlledCode from '!raw!./ExampleControlled';

const TextFieldsPage = () => (
  <div>
    <MarkdownElement text={textFieldReadmeText} />
    <CodeExample code={textFieldExampleSimpleCode}>
      <TextFieldExampleSimple />
    </CodeExample>
    <CodeExample code={textFieldExampleErrorCode}>
      <TextFieldExampleError />
    </CodeExample>
    <CodeExample code={textFieldExampleCustomizeCode}>
      <TextFieldExampleCustomize />
    </CodeExample>
    <CodeExample code={textFieldExampleDisabledCode}>
      <TextFieldExampleDisabled />
    </CodeExample>
    <CodeExample code={textFieldExampleControlledCode}>
      <TextFieldExampleControlled />
    </CodeExample>
    <PropTypeDescription code={textFieldCode}/>
  </div>
);

export default TextFieldsPage;
