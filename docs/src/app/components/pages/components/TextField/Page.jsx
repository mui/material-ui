import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import textFieldReadmeText from './README';
import textFieldCode from '!raw!material-ui/lib/TextField/TextField';
import TextFieldExampleSimple from './ExampleSimple';
import textFieldExampleSimpleCode from '!raw!./ExampleSimple';
import TextFieldExampleHint from './ExampleHint';
import textFieldExampleHintCode from '!raw!./ExampleHint';
import TextFieldExampleError from './ExampleError';
import textFieldExampleErrorCode from '!raw!./ExampleError';
import TextFieldExampleMultiLine from './ExampleMultiLine';
import textFieldExampleMultiLineCode from '!raw!./ExampleMultiLine';
import TextFieldExampleControlled from './ExampleControlled';
import textFieldExampleControlledCode from '!raw!./ExampleControlled';
import TextFieldExampleComplex from './ExampleComplex';
import textFieldExampleComplexCode from '!raw!./ExampleComplex';

const TextFieldsPage = () => (
  <div>
    <MarkdownElement text={textFieldReadmeText} />
    <CodeExample code={textFieldExampleSimpleCode}>
      <TextFieldExampleSimple />
    </CodeExample>
    <CodeExample code={textFieldExampleHintCode}>
      <TextFieldExampleHint />
    </CodeExample>
    <CodeExample code={textFieldExampleErrorCode}>
      <TextFieldExampleError />
    </CodeExample>
    <CodeExample code={textFieldExampleMultiLineCode}>
      <TextFieldExampleMultiLine />
    </CodeExample>
    <CodeExample code={textFieldExampleControlledCode}>
      <TextFieldExampleControlled />
    </CodeExample>
    <CodeExample code={textFieldExampleComplexCode}>
      <TextFieldExampleComplex />
    </CodeExample>
    <PropTypeDescription code={textFieldCode}/>
  </div>
);

export default TextFieldsPage;
