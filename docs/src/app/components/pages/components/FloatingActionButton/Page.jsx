import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import floatingButtonCode from '!raw!material-ui/lib/floating-action-button';
import floatingButtonReadmeText from './README';
import floatingButtonExampleSimpleCode from '!raw!./ExampleSimple';
import FloatingButtonExampleSimple from './ExampleSimple';
import floatingButtonExampleComplexCode from '!raw!./ExampleComplex';
import FloatingButtonExampleComplex from './ExampleComplex';

const FloatingActionButtonPage = () => (
  <div>
    <MarkdownElement text={floatingButtonReadmeText} />
    <CodeExample code={floatingButtonExampleSimpleCode}>
      <FloatingButtonExampleSimple />
    </CodeExample>
    <CodeExample code={floatingButtonExampleComplexCode}>
      <FloatingButtonExampleComplex />
    </CodeExample>
    <PropTypeDescription code={floatingButtonCode} />
  </div>
);

export default FloatingActionButtonPage;
