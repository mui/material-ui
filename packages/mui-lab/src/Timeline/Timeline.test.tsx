import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, screen } from 'test/utils';
import Timeline, { timelineClasses as classes } from '@mui/lab/Timeline';

describe('<Timeline />', () => {
  const { render } = createRenderer();

  describeConformance(<Timeline />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    muiName: 'MuiTimeline',
    refInstanceof: window.HTMLUListElement,
    testVariantProps: { position: 'left' },
    testStateOverrides: { prop: 'position', value: 'left', styleKey: 'positionLeft' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should have correct classname', () => {
    render(<Timeline data-testid="timeline-root" position="alternate-reverse" />);

    expect(screen.getByTestId('timeline-root')).to.have.class(
      'MuiTimeline-positionAlternateReverse',
    );
  });
});
