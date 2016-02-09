import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import raisedButtonCode from '!raw!material-ui/lib/raised-button';
import raisedButtonReadmeText from './README';
import raisedButtonExampleSimpleCode from '!raw!./ExampleSimple';
import RaisedButtonExampleSimple from './ExampleSimple';
import raisedButtonExampleComplexCode from '!raw!./ExampleComplex';
import RaisedButtonExampleComplex from './ExampleComplex';

const descriptions = {
  simple: '`RaisedButton` with default color, `primary`, `secondary` and and `disabled` props applied.',
  complex: 'The first example uses an `input` as a child component, ' +
  'the next has next has an [SVG Icon](/#/components/svg-icon), with the label positioned after. ' +
  'The final example uses a [Font Icon](/#/components/font-icon), and is wrapped in an anchor tag.',
};

const RaisedButtonPage = () => (
  <div>
    <Title render={(previousTitle) => `Raised Button - ${previousTitle}`} />
    <MarkdownElement text={raisedButtonReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={raisedButtonExampleSimpleCode}
    >
      <RaisedButtonExampleSimple />
    </CodeExample>
    <CodeExample
      title="Complex examples"
      description={descriptions.complex}
      code={raisedButtonExampleComplexCode}
    >
      <RaisedButtonExampleComplex />
    </CodeExample>
    <PropTypeDescription code={raisedButtonCode} />
  </div>
);

export default RaisedButtonPage;
