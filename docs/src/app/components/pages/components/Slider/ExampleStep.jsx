import React from 'react';
import Slider from 'material-ui/lib/slider';

const SliderExampleStep = () => (
  <div>
    <Slider step={0.10} value={.5}/>
    <Slider defaultValue={50}
      step={1} min={0} max={100}
      popover={true}/>
  </div>
);

export default SliderExampleStep;
