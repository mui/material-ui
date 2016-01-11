import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import flatButtonCode from '!raw!material-ui/lib/flat-button';
import flatButtonReadmeText from './README';
import flatButtonExampleSimpleCode from '!raw!./ExampleSimple';
import FlatButtonExampleSimple from './ExampleSimple';
import flatButtonExampleComplexCode from '!raw!./ExampleComplex';
import FlatButtonExampleComplex from './ExampleComplex';

const FlatButtonPage = () => (
  <div>
    <MarkdownElement text={flatButtonReadmeText}/>
    <CodeExample code={flatButtonExampleSimpleCode}>
      <FlatButtonExampleSimple />
    </CodeExample>
    <CodeExample code={flatButtonExampleComplexCode}>
      <FlatButtonExampleComplex />
    </CodeExample>
    <PropTypeDescription code={flatButtonCode}/>
  </div>
);

export default FlatButtonPage;
