import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import checkboxReadmeText from './README';
import checkboxCode from '!raw!material-ui/lib/checkbox';
import CheckboxExampleSimple from './ExampleSimple';
import checkboxExampleSimpleCode from '!raw!./ExampleSimple';

const CheckboxPage = () => (
  <div>
    <MarkdownElement text={checkboxReadmeText} />
    <CodeExample
      code={checkboxExampleSimpleCode}
      title="Checkbox examples"
    >
      <CheckboxExampleSimple />
    </CodeExample>
    <PropTypeDescription code={checkboxCode} />
  </div>
);

export default CheckboxPage;
