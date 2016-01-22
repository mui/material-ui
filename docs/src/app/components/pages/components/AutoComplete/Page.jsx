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

const descriptions = {
  simple: 'The input is used to create the `dataSource`, so the input always matches three entries.',
  noFilter: 'The first example has `MenuItem`s in its data source that display on data entry. ' +
  'The second example uses an array of values as its `dataSource`, and updates onFocus ' +
  'Both examples have filtering disabled.',
  filters: 'Two examples of filtering. The first uses `fuzzyFilter`, the second uses `caseInsensitiveFilter`.',
};

const AutoCompletesPage = () => (
  <div>
    <MarkdownElement text={autoCompleteReadmeText} />
    <CodeExample
      code={autoCompleteExampleSimpleCode}
      title="Simple example"
      description={descriptions.simple}
    >
      <AutoCompleteExampleSimple />
    </CodeExample>
    <CodeExample
      code={autoCompleteExampleNoFilterCode}
      title="Data sources"
      description={descriptions.noFilter}
    >
      <AutoCompleteExampleNoFilter />
    </CodeExample>
    <CodeExample
      code={autoCompleteExampleFiltersCode}
      title="Filters"
      description={descriptions.filters}
    >
      <AutoCompleteExampleFilters />
    </CodeExample>
    <PropTypeDescription code={autoCompleteCode} />
  </div>
);

export default AutoCompletesPage;
