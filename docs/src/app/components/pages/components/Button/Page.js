import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
// import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import ButtonReadmeText from './README';
import ButtonExampleSimpleCode from '!raw!./ExampleSimple';
import ButtonExampleSimple from './ExampleSimple';
import ButtonExampleComplexCode from '!raw!./ExampleComplex';
import ButtonExampleComplex from './ExampleComplex';
import ButtonExampleIconCode from '!raw!./ExampleIcon';
import ButtonExampleIcon from './ExampleIcon';
import ButtonExampleFabCode from '!raw!./ExampleFab';
import ButtonExampleFab from './ExampleFab';
// import buttonCode from '!raw!material-ui/Button/Button';

const ButtonPage = () => (
  <div>
    <Title render={(previousTitle) => `Raised Button - ${previousTitle}`} />
    <MarkdownElement text={ButtonReadmeText} />
    <CodeExample
      title="Simple examples"
      code={ButtonExampleSimpleCode}
    >
      <ButtonExampleSimple />
    </CodeExample>
    <CodeExample
      title="Complex examples"
      code={ButtonExampleComplexCode}
    >
      <ButtonExampleComplex />
    </CodeExample>
    <CodeExample
      title="Icon examples"
      code={ButtonExampleIconCode}
    >
      <ButtonExampleIcon />
    </CodeExample>
    <CodeExample
      title="Floating Action Button examples"
      code={ButtonExampleFabCode}
    >
      <ButtonExampleFab />
    </CodeExample>
  </div>
);

export default ButtonPage;
