import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import sliderReadmeText from './README';
import SliderExampleSimple from './ExampleSimple';
import sliderExampleSimpleCode from '!raw!./ExampleSimple';
import SliderExampleDisabled from './ExampleDisabled';
import sliderExampleDisabledCode from '!raw!./ExampleDisabled';
import SliderExampleStep from './ExampleStep';
import sliderExampleStepCode from '!raw!./ExampleStep';
import sliderCode from '!raw!material-ui/lib/Slider/Slider';

const descriptions = {
  simple: 'The `defaultValue` property sets the initial position of the slider. The slider appearance changes when ' +
  'not at the starting position.',
  stepped: 'By default, the slider is continuous. The `step` property causes the slider to move in discrete ' +
  'increments.',
};

const SliderPage = () => (
  <div>
    <Title render={(previousTitle) => `Slider - ${previousTitle}`} />
    <MarkdownElement text={sliderReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={sliderExampleSimpleCode}
    >
      <SliderExampleSimple />
    </CodeExample>
    <CodeExample
      title="Disabled examples"
      code={sliderExampleDisabledCode}
    >
      <SliderExampleDisabled />
    </CodeExample>
    <CodeExample
      title="Stepped example"
      description={descriptions.stepped}
      code={sliderExampleStepCode}
    >
      <SliderExampleStep />
    </CodeExample>
    <PropTypeDescription code={sliderCode} />
  </div>
);

export default SliderPage;
