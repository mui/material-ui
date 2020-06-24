import * as React from 'react';
import Slider from '@material-ui/core/Slider';

function testOnChange() {
  function handleSliderChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Slider onChange={handleSliderChange} onChangeCommitted={handleSliderChange} />;

  function handleChange(event: React.ChangeEvent<Element>) {}
  // @ts-expect-error internally it's whatever even lead to a change in value
  <Slider onChange={handleChange} onChangeCommitted={handleChange} />;
}
