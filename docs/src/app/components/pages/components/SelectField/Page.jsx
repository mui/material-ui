import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import selectFieldReadmeText from './README';
import SelectFieldExampleSimple from './ExampleSimple';
import selectFieldExampleSimpleCode from '!raw!./ExampleSimple';
import SelectFieldLongMenuExample from './ExampleLongMenu';
import selectFieldLongMenuExampleCode from '!raw!./ExampleLongMenu';
import SelectFieldExampleCustomLabel from './ExampleCustomLabel';
import selectFieldExampleCustomLabelCode from '!raw!./ExampleCustomLabel';
import SelectFieldExampleFloatingLabel from './ExampleFloatingLabel';
import selectFieldExampleFloatingLabelCode from '!raw!./ExampleFloatingLabel';
import SelectFieldExampleError from './ExampleError';
import selectFieldExampleErrorCode from '!raw!./ExampleError';
import selectFieldCode from '!raw!material-ui/lib/SelectField/SelectField';

const descriptions = {
  simple: '`SelectField` is implemented as a controlled component, with the current selection set through the ' +
  '`value` property. The `SelectField` can be disabled with the `disabled` property.',
  long: 'With the `maxHeight` property set, the Select Field will be scrollable if the number of items causes the ' +
  'height to exceed this limit.',
  label: 'With a `label` applied to each `MenuItem`, `SelectField` displays a complementary description of the ' +
  'selected item.',
  floating: '`SelectField` supports a floating label with the `floatingLabelText` property. This can be customised ' +
  'with `the floatingLabelText` property.',
  errorText: 'The `errorText` property displays an error message below the Select Field. This can be customised with ' +
  'the `errorStyle` property.',
};

const SelectFieldPage = () => (
  <div>
    <Title render={(previousTitle) => `Select Field - ${previousTitle}`} />
    <MarkdownElement text={selectFieldReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={selectFieldExampleSimpleCode}
    >
      <SelectFieldExampleSimple />
    </CodeExample>
    <CodeExample
      title="Long example"
      description={descriptions.long}
      code={selectFieldLongMenuExampleCode}
    >
      <SelectFieldLongMenuExample />
    </CodeExample>
    <CodeExample
      title="Label example"
      description={descriptions.label}
      code={selectFieldExampleCustomLabelCode}
    >
      <SelectFieldExampleCustomLabel />
    </CodeExample>
    <CodeExample
      title="Floating label example"
      description={descriptions.floating}
      code={selectFieldExampleFloatingLabelCode}
    >
      <SelectFieldExampleFloatingLabel />
    </CodeExample>
    <CodeExample
      title="ErrorText example"
      description={descriptions.errorText}
      code={selectFieldExampleErrorCode}
    >
      <SelectFieldExampleError />
    </CodeExample>
    <PropTypeDescription code={selectFieldCode} />
  </div>
);

export default SelectFieldPage;
