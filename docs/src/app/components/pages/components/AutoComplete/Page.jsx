import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import autoCompleteReadmeText from './README';
import autoCompleteCode from '!raw!material-ui/lib/auto-complete';
import AutoCompleteExampleSimple from './ExampleSimple';
import autoCompleteExampleSimpleCode from '!raw!./ExampleSimple';
import AutoCompleteExampleNoFilter from './ExampleNoFilter';
import autoCompleteExampleNoFilterCode from '!raw!./ExampleNoFilter';
import AutoCompleteExampleFilters from './ExampleFilters';
import autoCompleteExampleFiltersCode from '!raw!./ExampleFilters';

const AutoCompletesPage = () => (
  <div>
    <MarkdownElement text={autoCompleteReadmeText} />
    <CodeExample code={autoCompleteExampleSimpleCode}>
      <AutoCompleteExampleSimple />
    </CodeExample>
    <CodeExample code={autoCompleteExampleNoFilterCode}>
      <AutoCompleteExampleNoFilter />
    </CodeExample>
    <CodeExample code={autoCompleteExampleFiltersCode}>
      <AutoCompleteExampleFilters />
    </CodeExample>
    <PropTypeDescription code={autoCompleteCode} />
  </div>
);

export default AutoCompletesPage;
