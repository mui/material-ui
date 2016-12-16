import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import autoCompleteReadmeText from './README';
import autoCompleteCode from '!raw!material-ui/AutoComplete/AutoComplete';
import AutoCompleteExampleSimple from './ExampleSimple';
import autoCompleteExampleSimpleCode from '!raw!./ExampleSimple';
import AutoCompleteExampleDataSources from './ExampleDataSources';
import autoCompleteExampleDataSourcesCode from '!raw!./ExampleDataSources';
import AutoCompleteExampleFilters from './ExampleFilters';
import autoCompleteExampleFiltersCode from '!raw!./ExampleFilters';
import AutoCompleteExampleControlled from './ExampleControlled';
import autoCompleteExampleControlledCode from '!raw!./ExampleControlled';

const AutoCompletesPage = () => (
  <div>
    <Title render={(previousTitle) => `Auto Complete - ${previousTitle}`} />
    <MarkdownElement text={autoCompleteReadmeText} />
    <CodeExample
      code={autoCompleteExampleSimpleCode}
      title="Simple example"
    >
      <AutoCompleteExampleSimple />
    </CodeExample>
    <CodeExample
      code={autoCompleteExampleDataSourcesCode}
      title="Data sources"
    >
      <AutoCompleteExampleDataSources />
    </CodeExample>
    <CodeExample
      code={autoCompleteExampleFiltersCode}
      title="Filters"
    >
      <AutoCompleteExampleFilters />
    </CodeExample>
    <CodeExample
      code={autoCompleteExampleControlledCode}
      title="Controlled example"
    >
      <AutoCompleteExampleControlled />
    </CodeExample>
    <PropTypeDescription code={autoCompleteCode} />
  </div>
);

export default AutoCompletesPage;
