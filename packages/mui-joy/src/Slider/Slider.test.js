import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer } from 'test/utils';
import Slider, { sliderClasses as classes } from '@mui/joy/Slider';
import { ThemeProvider } from '@mui/joy/styles';

describe('<Slider />', () => {
  const { render } = createRenderer();

  describeConformance(<Slider />, () => ({
    classes,
    render,
    ThemeProvider,
    muiName: 'JoySlider',
    refInstanceof: window.HTMLSpanElement,
    testVariantProps: { color: 'success' },
    skip: ['componentProp', 'componentsProp', 'classesRoot', 'propsSpread', 'themeDefaultProps'],
  }));

  it('should render the rail as the first child of the Slider', () => {
    const {
      container: { firstChild: root },
    } = render(<Slider />);

    expect(root.childNodes[0]).to.have.property('tagName', 'SPAN');
    expect(root.childNodes[0]).to.have.class(classes.rail);
  });

  it('should show formatted label', () => {
    const { getByText } = render(
      <Slider value={10} valueLabelDisplay="on" valueLabelFormat={(value) => `${value}px`} />,
    );

    expect(getByText('10px')).toBeVisible();
  });
});
