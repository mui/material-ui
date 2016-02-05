import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import datePickerCode from '!raw!material-ui/lib/date-picker/date-picker';
import DatePickerExampleSimple from './ExampleSimple';
import datePickerExampleSimpleCode from '!raw!./ExampleSimple';
import DatePickerExampleInline from './ExampleInline';
import datePickerExampleInlineCode from '!raw!./ExampleInline';
import DatePickerExampleToggle from './ExampleToggle';
import datePickerExampleToggleCode from '!raw!./ExampleToggle';
import DatePickerExampleControlled from './ExampleControlled';
import datePickerExampleControlledCode from '!raw!./ExampleControlled';
import DatePickerExampleInternational from './ExampleInternational';
import datePickerExampleInternationalCode from '!raw!./ExampleInternational';
import datePickerReadmeText from './README';

const descriptions = {
  simple: 'The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`. You can ' +
  'also disable the Dialog passing `true` to the `disabled` property.',
  inline: 'Inline Date Pickers are displayed below the input, rather than as a modal dialog. ',
  ranged: 'This example allows you to set a date range, and to toggle `autoOk`, and `disableYearSelection`.',
  controlled: '`DatePicker` can be implemented as a controlled input, where `value` is handled by state in the ' +
  'parent component.',
  localised: 'Date Picker can be localised using the `locale` property, in this case in French. ' +
  'Note that the buttons must be localised using the `wordings` property, and we set the `firstDayOfWeek` to Monday.',
};

const DatePickerPage = () => (
  <div>
    <MarkdownElement text={datePickerReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={datePickerExampleSimpleCode}
    >
      <DatePickerExampleSimple/>
    </CodeExample>
    <CodeExample
      title="Inline examples"
      description={descriptions.inline}
      code={datePickerExampleInlineCode}
    >
      <DatePickerExampleInline/>
    </CodeExample>
    <CodeExample
      title="Ranged example"
      description={descriptions.ranged}
      code={datePickerExampleToggleCode}
    >
      <DatePickerExampleToggle/>
    </CodeExample>
    <CodeExample
      title="Controlled example"
      description={descriptions.controlled}
      code={datePickerExampleControlledCode}
    >
      <DatePickerExampleControlled/>
    </CodeExample>
    <CodeExample
      title="Localised example"
      description={descriptions.localised}
      code={datePickerExampleInternationalCode}
    >
      <DatePickerExampleInternational/>
    </CodeExample>
    <PropTypeDescription code={datePickerCode} />
  </div>
);

export default DatePickerPage;
