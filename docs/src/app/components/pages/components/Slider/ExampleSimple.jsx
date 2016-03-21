import React from 'react';
import Slider from 'material-ui/Slider';

const SliderExampleSimple = () => (
  <div>
    <Slider />
    <Slider defaultValue={0.5} />
    <Slider defaultValue={1} />
  </div>
);

export default SliderExampleSimple;
