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
import DatePickerExampleInternational from './ExampleInternational';
import datePickerExampleInternationalCode from '!raw!./ExampleInternational';
import datePickerReadmeText from './README';

if (!window.Intl) {
  require('intl');
  require('intl/locale-data/jsonp/fr');
}

const DatePickerPage = () => (
    <div>
      <MarkdownElement text={datePickerReadmeText} />
      <CodeExample code={datePickerExampleSimpleCode}>
        <DatePickerExampleSimple/>
      </CodeExample>
      <CodeExample code={datePickerExampleInlineCode}>
        <DatePickerExampleInline/>
      </CodeExample>
      <CodeExample code={datePickerExampleToggleCode}>
        <DatePickerExampleToggle/>
      </CodeExample>
      <CodeExample code={datePickerExampleInternationalCode}>
        <DatePickerExampleInternational/>
      </CodeExample>
      <PropTypeDescription code={datePickerCode} />
    </div>
);

export default DatePickerPage;
