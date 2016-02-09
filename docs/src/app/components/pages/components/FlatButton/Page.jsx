import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import flatButtonCode from '!raw!material-ui/lib/flat-button';
import flatButtonReadmeText from './README';
import flatButtonExampleSimpleCode from '!raw!./ExampleSimple';
import FlatButtonExampleSimple from './ExampleSimple';
import flatButtonExampleComplexCode from '!raw!./ExampleComplex';
import FlatButtonExampleComplex from './ExampleComplex';

const descriptions = {
  simple: '`FlatButton` with default color, `primary`, `secondary` and and `disabled` props applied.',
  complex: 'The first example uses an `input` as a child component, ' +
  'the next has next has an [SVG Icon](/#/components/svg-icon), with the label positioned after. ' +
  'The final example uses a [Font Icon](/#/components/font-icon), and is wrapped in an anchor tag.',
};

const FlatButtonPage = () => (
  <div>
    <Title render={(previousTitle) => `Flat Button - ${previousTitle}`} />
    <MarkdownElement text={flatButtonReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={flatButtonExampleSimpleCode}
    >
      <FlatButtonExampleSimple />
    </CodeExample>
    <CodeExample
      title="Complex examples"
      description={descriptions.complex}
      code={flatButtonExampleComplexCode}
    >
      <FlatButtonExampleComplex />
    </CodeExample>
    <PropTypeDescription code={flatButtonCode} />
  </div>
);

export default FlatButtonPage;
