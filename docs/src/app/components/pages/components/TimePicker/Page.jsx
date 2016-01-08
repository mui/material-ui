import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import timePickerReadmeText from './README';
import timePickerCode from '!raw!material-ui/lib/time-picker/time-picker';
import TimePickerExampleSimple from './ExampleSimple';
import timePickerExampleSimpleCode from '!raw!./ExampleSimple';
import TimePickerExampleComplex from './ExampleComplex';
import timePickerExampleComplexCode from '!raw!./ExampleComplex';

const TimePickersPage = () => (
  <div>
    <MarkdownElement text={timePickerReadmeText} />
    <CodeExample code={timePickerExampleSimpleCode}>
      <TimePickerExampleSimple />
    </CodeExample>
    <CodeExample code={timePickerExampleComplexCode}>
      <TimePickerExampleComplex />
    </CodeExample>
    <PropTypeDescription code={timePickerCode} />
  </div>
);

export default TimePickersPage;
