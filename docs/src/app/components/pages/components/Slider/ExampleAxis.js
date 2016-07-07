import React from 'react';
import Slider from 'material-ui/Slider';

/**
 * The orientation of the slider can be reversed and rotated using the `axis` prop.
 */
const SliderExampleAxis = () => (
  <div style={{display: 'flex', height: 124, flexDirection: 'row', justifyContent: 'space-around'}}>
    <Slider style={{height: 100}} axis="y" defaultValue={0.5} />
    <Slider style={{width: 200}} axis="x-reverse" />
    <Slider style={{height: 100}} axis="y-reverse" defaultValue={1} />
  </div>
);

export default SliderExampleAxis;
