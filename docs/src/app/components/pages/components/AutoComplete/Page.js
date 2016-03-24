import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import autoCompleteReadmeText from './README';
import autoCompleteCode from '!raw!material-ui/lib/AutoComplete/AutoComplete';
import AutoCompleteExampleSimple from './ExampleSimple';
import autoCompleteExampleSimpleCode from '!raw!./ExampleSimple';
import AutoCompleteExampleDataSources from './ExampleDataSources';
import autoCompleteExampleDataSourcesCode from '!raw!./ExampleDataSources';
import AutoCompleteExampleFilters from './ExampleFilters';
import autoCompleteExampleFiltersCode from '!raw!./ExampleFilters';

const descriptions = {
  simple: 'The input is used to create the `dataSource`, so the input always matches three entries.',
  noFilter: 'The first example has `MenuItem`s in its data source that display on data entry. ' +
  'The second example uses an array of values as its `dataSource`, and updates onFocus ' +
  'Both examples have filtering disabled.',
  filters: 'Two examples of filtering. The first uses `caseInsensitiveFilter`, the second uses `fuzzyFilter`, ' +
  'and limits the number of results displayed using the `maxSearchResults` property.',
};

const AutoCompletesPage = () => (
  <div>
    <Title render={(previousTitle) => `Auto Complete - ${previousTitle}`} />
    <MarkdownElement text={autoCompleteReadmeText} />
    <CodeExample
      code={autoCompleteExampleSimpleCode}
      title="Simple example"
      description={descriptions.simple}
    >
      <AutoCompleteExampleSimple />
    </CodeExample>
    <CodeExample
      code={autoCompleteExampleDataSourcesCode}
      title="Data sources"
      description={descriptions.noFilter}
    >
      <AutoCompleteExampleDataSources />
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
