import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Slider, { sliderClasses as classes } from '@mui/joy/Slider';
import { ThemeProvider } from '@mui/joy/styles';
import describeConformance from '../../test/describeConformance';

describe('<Slider />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Slider
      value={10}
      marks={[
        {
          value: 0,
          label: '0°C',
        },
      ]}
    />,
    () => ({
      classes,
      render,
      ThemeProvider,
      muiName: 'JoySlider',
      refInstanceof: window.HTMLSpanElement,
      testVariantProps: { color: 'success' },
      slots: {
        root: { expectedClassName: classes.root },
        rail: { expectedClassName: classes.rail },
        track: { expectedClassName: classes.track },
        thumb: { expectedClassName: classes.thumb },
        input: { expectedClassName: classes.input },
        mark: { expectedClassName: classes.mark },
      },
      skip: ['componentsProp', 'classesRoot', 'propsSpread'],
    }),
  );

  it('should render the rail as the first child of the Slider', () => {
    const { container } = render(<Slider />);

    const sliderComponent = container.firstChild!;

    expect(sliderComponent.childNodes[0]).to.have.property('tagName', 'SPAN');
    expect(sliderComponent.childNodes[0]).to.have.class(classes.rail);
  });

  it('should show formatted label', () => {
    const { getByText } = render(
      <Slider value={10} valueLabelDisplay="on" valueLabelFormat={(value) => `${value}px`} />,
    );

    expect(getByText('10px')).toBeVisible();
  });
});
