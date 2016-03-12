import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import timePickerReadmeText from './README';
import timePickerCode from '!raw!material-ui/lib/time-picker/time-picker';
import TimePickerExampleSimple from './ExampleSimple';
import timePickerExampleSimpleCode from '!raw!./ExampleSimple';
import TimePickerExampleComplex from './ExampleComplex';
import timePickerExampleComplexCode from '!raw!./ExampleComplex';
import TimePickerExampleInternational from './ExampleInternational';
import timePickerExampleInternationalCode from '!raw!./ExampleInternational';

const descriptions = {
  simple: 'Time Picker supports 12 hour and 24 hour formats. In 12 hour format the AM and PM indicators toggle the ' +
  'selected time period.',
  controlled: '`TimePicker` can be used as a controlled component.',
  localised: 'The buttons can be localised using the `cancelLabel` and `okLabel` properties.',
};

const TimePickersPage = () => (
  <div>
    <Title render={(previousTitle) => `Time Picker - ${previousTitle}`} />
    <MarkdownElement text={timePickerReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={timePickerExampleSimpleCode}
    >
      <TimePickerExampleSimple />
    </CodeExample>
    <CodeExample
      title="Controlled examples"
      description={descriptions.controlled}
      code={timePickerExampleComplexCode}
    >
      <TimePickerExampleComplex />
    </CodeExample>
    <CodeExample
      title="Localised example"
      description={descriptions.localised}
      code={timePickerExampleInternationalCode}
    >
      <TimePickerExampleInternational />
    </CodeExample>
    <PropTypeDescription code={timePickerCode} />
  </div>
);

export default TimePickersPage;
