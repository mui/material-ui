import React from 'react';
import Slider from 'material-ui/lib/slider';

const SliderExampleDisabled = () => (
  <div>
    <Slider disabled={true} />
    <Slider disabled={true} value={0.5} />
    <Slider disabled={true} value={1} />
  </div>
);

export default SliderExampleDisabled;
