import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import radioButtonReadmeText from './README';
import radioButtonCode from '!raw!material-ui/lib/radio-button';
import radioButtonGroupCode from '!raw!material-ui/lib/radio-button-group';
import RadioButtonExampleSimple from './ExampleSimple';
import radioButtonExampleSimpleCode from '!raw!./ExampleSimple';

const RadioButtonPage = () => (
  <div>
    <MarkdownElement text={radioButtonReadmeText} />
    <CodeExample code={radioButtonExampleSimpleCode}>
      <RadioButtonExampleSimple />
    </CodeExample>
    <PropTypeDescription code={radioButtonCode} header="### RadioButton Properties" />
    <PropTypeDescription code={radioButtonGroupCode} header="### RadioButtonGroup Properties" />
  </div>
);

export default RadioButtonPage;
