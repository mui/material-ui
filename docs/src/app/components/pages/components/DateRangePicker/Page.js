import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
// import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dateRangePickerReadmeText from './README';
import DateRangePickerExampleSimple from './ExampleSimple';
import dateRangePickerExampleSimpleCode from '!raw!./ExampleSimple';
import DateRangePickerExampleInline from './ExampleInline';
import dateRangePickerExampleInlineCode from '!raw!./ExampleInline';
import DateRangePickerExampleToggle from './ExampleToggle';
import dateRangePickerExampleToggleCode from '!raw!./ExampleToggle';
import DateRangePickerExampleControlled from './ExampleControlled';
import dateRangePickerExampleControlledCode from '!raw!./ExampleControlled';
import DateRangePickerExampleDisableDates from './ExampleDisableDates';
import dateRangePickerExampleDisableDatesCode from '!raw!./ExampleDisableDates';
import DateRangePickerExampleInternational from './ExampleInternational';
import dateRangePickerExampleInternationalCode from '!raw!./ExampleInternational';
// import dateRangePickerCode from '!raw!material-ui/DatePicker/DatePicker';

const DatePickerPage = () => (
  <div>
    <Title render={(previousTitle) => `Date Range Picker - ${previousTitle}`} />
    <MarkdownElement text={dateRangePickerReadmeText} />
    <CodeExample
      title="Simple examples"
      code={dateRangePickerExampleSimpleCode}
    >
      <DateRangePickerExampleSimple />
    </CodeExample>
    <CodeExample
      title="Inline examples"
      code={dateRangePickerExampleInlineCode}
    >
      <DateRangePickerExampleInline />
    </CodeExample>
    <CodeExample
      title="Ranged example"
      code={dateRangePickerExampleToggleCode}
    >
      <DateRangePickerExampleToggle />
    </CodeExample>
    <CodeExample
      title="Controlled example"
      code={dateRangePickerExampleControlledCode}
    >
      <DateRangePickerExampleControlled />
    </CodeExample>
    <CodeExample
      title="Disabled dates example"
      code={dateRangePickerExampleDisableDatesCode}
    >
      <DateRangePickerExampleDisableDates />
    </CodeExample>
    <CodeExample
      title="Localised example"
      code={dateRangePickerExampleInternationalCode}
    >
      <DateRangePickerExampleInternational />
    </CodeExample>
    {/* <PropTypeDescription code={dateRangePickerCode} /> */}
  </div>
);

export default DatePickerPage;
