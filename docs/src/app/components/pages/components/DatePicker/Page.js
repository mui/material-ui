import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import datePickerReadmeText from 'material-ui/DatePicker/examples/README';
import DatePickerExampleSimple from 'material-ui/DatePicker/examples/ExampleSimple';
import datePickerExampleSimpleCode from '!raw!material-ui/DatePicker/examples/ExampleSimple';
import DatePickerExampleInline from 'material-ui/DatePicker/examples/ExampleInline';
import datePickerExampleInlineCode from '!raw!material-ui/DatePicker/examples/ExampleInline';
import DatePickerExampleToggle from 'material-ui/DatePicker/examples/ExampleToggle';
import datePickerExampleToggleCode from '!raw!material-ui/DatePicker/examples/ExampleToggle';
import DatePickerExampleControlled from 'material-ui/DatePicker/examples/ExampleControlled';
import datePickerExampleControlledCode from '!raw!material-ui/DatePicker/examples/ExampleControlled';
import DatePickerExampleDisableDates from 'material-ui/DatePicker/examples/ExampleDisableDates';
import datePickerExampleDisableDatesCode from '!raw!material-ui/DatePicker/examples/ExampleDisableDates';
import DatePickerExampleInternational from 'material-ui/DatePicker/examples/ExampleInternational';
import datePickerExampleInternationalCode from '!raw!material-ui/DatePicker/examples/ExampleInternational';
import datePickerCode from '!raw!material-ui/lib/DatePicker/DatePicker';

const descriptions = {
  simple: 'The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`. You can ' +
  'also disable the Dialog passing `true` to the `disabled` property.',
  inline: 'Inline Date Pickers are displayed below the input, rather than as a modal dialog. ',
  ranged: 'This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.',
  controlled: '`DatePicker` can be implemented as a controlled input, where `value` is handled by state in the ' +
  'parent component.',
  disabledDates: '`DatePicker` can disable specific dates based on the return value of a callback.',
  localised: '`DatePicker` can be localised using the `locale` property. The first example is localised in French. ' +
  'Note that the buttons must be separately localised using the `cancelLabel` and `okLabel` properties. \n\n' +
  'The `firstDayOfWeek` property defaults to `1`, (Monday), so may also need to be set for the target locale. ' +
  'The second example shows `firstDayOfWeek` set to `0`, (Sunday), and `locale` to `en-US` which matches the ' +
  'bahavior of the Date Picker prior to 0.15.0.\n\n' +
  'The final example displays the resulting date in a custom format using the `formatDate` property.',
};

const DatePickerPage = () => (
  <div>
    <Title render={(previousTitle) => `Date Picker - ${previousTitle}`} />
    <MarkdownElement text={datePickerReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={datePickerExampleSimpleCode}
    >
      <DatePickerExampleSimple />
    </CodeExample>
    <CodeExample
      title="Inline examples"
      description={descriptions.inline}
      code={datePickerExampleInlineCode}
    >
      <DatePickerExampleInline />
    </CodeExample>
    <CodeExample
      title="Ranged example"
      description={descriptions.ranged}
      code={datePickerExampleToggleCode}
    >
      <DatePickerExampleToggle />
    </CodeExample>
    <CodeExample
      title="Controlled example"
      description={descriptions.controlled}
      code={datePickerExampleControlledCode}
    >
      <DatePickerExampleControlled />
    </CodeExample>
    <CodeExample
      title="Disabled dates example"
      description={descriptions.disabledDates}
      code={datePickerExampleDisableDatesCode}
    >
      <DatePickerExampleDisableDates />
    </CodeExample>
    <CodeExample
      title="Localised example"
      description={descriptions.localised}
      code={datePickerExampleInternationalCode}
    >
      <DatePickerExampleInternational />
    </CodeExample>
    <PropTypeDescription code={datePickerCode} />
  </div>
);

export default DatePickerPage;
