import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import sliderReadmeText from './README';
import sliderCode from '!raw!material-ui/lib/slider';
import SliderExampleSimple from './ExampleSimple';
import sliderExampleSimpleCode from '!raw!./ExampleSimple';
import SliderExampleDisabled from './ExampleDisabled';
import sliderExampleDisabledCode from '!raw!./ExampleDisabled';
import SliderExampleStep from './ExampleStep';
import sliderExampleStepCode from '!raw!./ExampleStep';

const SliderPage = () => (
  <div>
    <MarkdownElement text={sliderReadmeText} />
    <CodeExample code={sliderExampleSimpleCode}>
      <SliderExampleSimple />
    </CodeExample>
    <CodeExample code={sliderExampleDisabledCode}>
      <SliderExampleDisabled />
    </CodeExample>
    <CodeExample code={sliderExampleStepCode}>
      <SliderExampleStep />
    </CodeExample>
    <PropTypeDescription code={sliderCode}/>
  </div>
);

export default SliderPage;
