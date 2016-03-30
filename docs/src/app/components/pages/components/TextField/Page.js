import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import textFieldReadmeText from 'material-ui/TextField/examples/README';
import TextFieldExampleSimple from 'material-ui/TextField/examples/ExampleSimple';
import textFieldExampleSimpleCode from '!raw!material-ui/TextField/examples/ExampleSimple';
import TextFieldExampleCustomize from 'material-ui/TextField/examples/ExampleCustomize';
import textFieldExampleCustomizeCode from '!raw!material-ui/TextField/examples/ExampleCustomize';
import TextFieldExampleError from 'material-ui/TextField/examples/ExampleError';
import textFieldExampleErrorCode from '!raw!material-ui/TextField/examples/ExampleError';
import TextFieldExampleDisabled from 'material-ui/TextField/examples/ExampleDisabled';
import textFieldExampleDisabledCode from '!raw!material-ui/TextField/examples/ExampleDisabled';
import TextFieldExampleControlled from 'material-ui/TextField/examples/ExampleControlled';
import textFieldExampleControlledCode from '!raw!material-ui/TextField/examples/ExampleControlled';
import textFieldCode from '!raw!material-ui/lib/TextField/TextField';

const descriptions = {
  simple: 'Examples demonstrating key Text Field features.',
  error: 'The `errorText` property used in combination with various other features.',
  styled: 'Examples of styling various Text Field features.',
  disabled: 'Various examples of `disabled` Text Fields.',
  controlled: 'A controlled Text Field example.',
};
const TextFieldsPage = () => (
  <div>
    <Title render={(previousTitle) => `Text Field - ${previousTitle}`} />
    <MarkdownElement text={textFieldReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={textFieldExampleSimpleCode}
    >
      <TextFieldExampleSimple />
    </CodeExample>
    <CodeExample
      title="Error examples"
      description={descriptions.error}
      code={textFieldExampleErrorCode}
    >
      <TextFieldExampleError />
    </CodeExample>
    <CodeExample
      title="Styled examples"
      description={descriptions.styled}
      code={textFieldExampleCustomizeCode}
    >
      <TextFieldExampleCustomize />
    </CodeExample>
    <CodeExample
      title="Disabled examples"
      description={descriptions.disabled}
      code={textFieldExampleDisabledCode}
    >
      <TextFieldExampleDisabled />
    </CodeExample>
    <CodeExample
      title="Controlled example"
      description={descriptions.controlled}
      code={textFieldExampleControlledCode}
    >
      <TextFieldExampleControlled />
    </CodeExample>
    <PropTypeDescription code={textFieldCode} />
  </div>
);

export default TextFieldsPage;
