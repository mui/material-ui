import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import flatButtonReadmeText from './README';
import flatButtonExampleSimpleCode from '!raw!./ExampleSimple';
import FlatButtonExampleSimple from './ExampleSimple';
import flatButtonExampleComplexCode from '!raw!./ExampleComplex';
import FlatButtonExampleComplex from './ExampleComplex';
import flatButtonExampleIconCode from '!raw!./ExampleIcon';
import FlatButtonExampleIcon from './ExampleIcon';
import flatButtonCode from '!raw!material-ui/FlatButton/FlatButton';

const descriptions = {
  simple: '`FlatButton` with default color, `primary`, `secondary` and and `disabled` props applied.',
  complex: 'The first example uses an `input` as a child component, ' +
  'the next has next has an [SVG Icon](/#/components/svg-icon), with the label positioned after. ' +
  'The final example uses a [Font Icon](/#/components/font-icon), and is wrapped in an anchor tag.',
  icon: 'Examples of Flat Buttons using an icon without a label. The first example uses an' +
  ' [SVG Icon](/#/components/svg-icon), and has the default color. The second example shows' +
  ' how the icon and background color can be changed. The final example uses a' +
  ' [Font Icon](/#/components/font-icon), and is wrapped in an anchor tag.',
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
    <CodeExample
      title="Icon examples"
      description={descriptions.icon}
      code={flatButtonExampleIconCode}
    >
      <FlatButtonExampleIcon />
    </CodeExample>
    <PropTypeDescription code={flatButtonCode} />
  </div>
);

export default FlatButtonPage;
