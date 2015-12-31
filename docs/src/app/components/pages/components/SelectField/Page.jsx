import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import selectFieldReadmeText from './README';
import SelectFieldExampleSimple from './ExampleSimple';
import selectFieldExampleSimpleCode from '!raw!./ExampleSimple';
import SelectFieldExampleDisabled from './ExampleDisabled';
import selectFieldExampleDisabledCode from '!raw!./ExampleDisabled';
import SelectFieldExampleCustomLabel from './ExampleCustomLabel';
import selectFieldExampleCustomLabelCode from '!raw!./ExampleCustomLabel';
import SelectFieldExampleFloatingLabel from './ExampleFloatingLabel';
import selectFieldExampleFloatingLabelCode from '!raw!./ExampleFloatingLabel';
import SelectFieldExampleError from './ExampleError';
import selectFieldExampleErrorCode from '!raw!./ExampleError';
import selectFieldCode from '!raw!material-ui/lib/SelectField/SelectField';

const SelectFieldPage = () => (
  <div>
    <MarkdownElement text={selectFieldReadmeText} />
    <CodeExample code={selectFieldExampleSimpleCode}>
      <SelectFieldExampleSimple />
    </CodeExample>
    <CodeExample code={selectFieldExampleDisabledCode}>
      <SelectFieldExampleDisabled />
    </CodeExample>
    <CodeExample code={selectFieldExampleCustomLabelCode}>
      <SelectFieldExampleCustomLabel />
    </CodeExample>
    <CodeExample code={selectFieldExampleFloatingLabelCode}>
      <SelectFieldExampleFloatingLabel />
    </CodeExample>
    <CodeExample code={selectFieldExampleErrorCode}>
      <SelectFieldExampleError />
    </CodeExample>
    <PropTypeDescription code={selectFieldCode}/>
  </div>
);

export default SelectFieldPage;
