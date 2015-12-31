import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import raisedButtonCode from '!raw!material-ui/lib/raised-button';
import raisedButtonReadmeText from './README';
import raisedButtonExampleSimpleCode from '!raw!./ExampleSimple';
import RaisedButtonExampleSimple from './ExampleSimple';
import RaisedButtonExampleComplexCode from '!raw!./ExampleComplex';
import RaisedButtonExampleComplex from './ExampleComplex';

const FloatingActionButtonPage = () => (
  <div>
    <MarkdownElement text={raisedButtonReadmeText}/>
    <CodeExample code={raisedButtonExampleSimpleCode}>
      <RaisedButtonExampleSimple />
    </CodeExample>
    <CodeExample code={RaisedButtonExampleComplexCode}>
      <RaisedButtonExampleComplex />
    </CodeExample>
    <PropTypeDescription code={raisedButtonCode}/>
  </div>
);

export default FloatingActionButtonPage;
