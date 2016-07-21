import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import textFieldReadmeText from './README';
import TextFieldExampleSimple from './ExampleSimple';
import textFieldExampleSimpleCode from '!raw!./ExampleSimple';
import TextFieldExampleCustomize from './ExampleCustomize';
import textFieldExampleCustomizeCode from '!raw!./ExampleCustomize';
import TextFieldExampleError from './ExampleError';
import textFieldExampleErrorCode from '!raw!./ExampleError';
import textFieldCode from '!raw!material-ui/TextFieldFlat/TextFieldFlat';

const descriptions = {
  simple: 'Examples demonstrating key Flat Text Field features.',
  error: 'The `errorText` property used in combination with various other features.',
  styled: 'Examples of styling various Flat Text Field features.',
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
    <PropTypeDescription code={textFieldCode} />
  </div>
);

export default TextFieldsPage;
