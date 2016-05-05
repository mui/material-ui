import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import datePickerReadmeText from './README';
import DatePickerExampleSimple from './ExampleSimple';
import datePickerExampleSimpleCode from '!raw!./ExampleSimple';
import DatePickerExampleInline from './ExampleInline';
import datePickerExampleInlineCode from '!raw!./ExampleInline';
import DatePickerExampleToggle from './ExampleToggle';
import datePickerExampleToggleCode from '!raw!./ExampleToggle';
import DatePickerExampleControlled from './ExampleControlled';
import datePickerExampleControlledCode from '!raw!./ExampleControlled';
import DatePickerExampleDisableDates from './ExampleDisableDates';
import datePickerExampleDisableDatesCode from '!raw!./ExampleDisableDates';
import DatePickerExampleInternational from './ExampleInternational';
import datePickerExampleInternationalCode from '!raw!./ExampleInternational';
import datePickerCode from '!raw!material-ui/DatePicker/DatePicker';

const DatePickerPage = () => (
  <div>
    <Title render={(previousTitle) => `Date Picker - ${previousTitle}`} />
    <MarkdownElement text={datePickerReadmeText} />
    <CodeExample
      title="Simple examples"
      code={datePickerExampleSimpleCode}
    >
      <DatePickerExampleSimple />
    </CodeExample>
    <CodeExample
      title="Inline examples"
      code={datePickerExampleInlineCode}
    >
      <DatePickerExampleInline />
    </CodeExample>
    <CodeExample
      title="Ranged example"
      code={datePickerExampleToggleCode}
    >
      <DatePickerExampleToggle />
    </CodeExample>
    <CodeExample
      title="Controlled example"
      code={datePickerExampleControlledCode}
    >
      <DatePickerExampleControlled />
    </CodeExample>
    <CodeExample
      title="Disabled dates example"
      code={datePickerExampleDisableDatesCode}
    >
      <DatePickerExampleDisableDates />
    </CodeExample>
    <CodeExample
      title="Localised example"
      code={datePickerExampleInternationalCode}
    >
      <DatePickerExampleInternational />
    </CodeExample>
    <PropTypeDescription code={datePickerCode} />
  </div>
);

export default DatePickerPage;
