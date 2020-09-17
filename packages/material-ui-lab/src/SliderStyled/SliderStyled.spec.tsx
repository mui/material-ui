import * as React from 'react';
import Slider from '@material-ui/lab/SliderStyled';

function testOnChange() {
  function handleSliderChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Slider onChange={handleSliderChange} onChangeCommitted={handleSliderChange} />;

  function handleElementChange(event: React.ChangeEvent) {}
  // @ts-expect-error internally it's whatever even lead to a change in value
  <Slider onChange={handleElementChange} onChangeCommitted={handleElementChange} />;

  // this is structurally equal to `React.SyntheticEvent`
  // It works but we don't recommend it since it has some non-structural implications: changeEvent.target === changeEvent.currentTarget
  function handleChange(event: React.ChangeEvent<{}>) {}
  <Slider onChange={handleChange} />;
}
