import * as React from 'react';
import { expect } from 'chai';
import { describeConformance, createRenderer, describeJoyColorInversion } from 'test/utils';
import Slider, { sliderClasses as classes } from '@mui/joy/Slider';
import { ThemeProvider } from '@mui/joy/styles';

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

  describeJoyColorInversion(<Slider />, { muiName: 'JoySlider', classes });

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
