import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import radioButtonReadmeText from './README';
import RadioButtonExampleSimple from './ExampleSimple';
import radioButtonExampleSimpleCode from '!raw!./ExampleSimple';
import radioButtonCode from '!raw!material-ui/lib/RadioButton/RadioButton';
import radioButtonGroupCode from '!raw!material-ui/lib/RadioButton/RadioButtonGroup';

const description = 'The second button is selected by default using the `defaultSelected` property of ' +
  '`RadioButtonGroup`. The third button is disabled using the `disabled` property of `RadioButton`. The final ' +
  'example uses the `labelPosition` property to position the label on the left. ';

const RadioButtonPage = () => (
  <div>
    <Title render={(previousTitle) => `Radio Button - ${previousTitle}`} />
    <MarkdownElement text={radioButtonReadmeText} />
    <CodeExample
      title="Examples"
      description={description}
      code={radioButtonExampleSimpleCode}
    >
      <RadioButtonExampleSimple />
    </CodeExample>
    <PropTypeDescription header="### RadioButton Properties" code={radioButtonCode} />
    <PropTypeDescription header="### RadioButtonGroup Properties" code={radioButtonGroupCode} />
  </div>
);

export default RadioButtonPage;
