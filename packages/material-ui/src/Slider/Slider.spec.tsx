import * as React from 'react';
import Slider from '@material-ui/core/Slider';

function testOnChange() {
  function handleSliderChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Slider onChange={handleSliderChange} onChangeCommitted={handleSliderChange} />;

  function handleElementChange(event: React.ChangeEvent) {}
  // @ts-expect-error internally it's whatever even lead to a change in value
  <Slider onChange={handleElementChange} onChangeCommitted={handleElementChange} />;
}
