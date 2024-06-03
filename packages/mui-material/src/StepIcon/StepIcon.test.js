import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import StepIcon, { stepIconClasses as classes } from '@mui/material/StepIcon';
import describeConformance from '../../test/describeConformance';

describe('<StepIcon />', () => {
  const { render } = createRenderer();

  describeConformance(<StepIcon icon={1} />, () => ({
    classes,
    inheritComponent: 'svg',
    render,
    muiName: 'MuiStepIcon',
    testVariantProps: { completed: true },
    refInstanceof: window.SVGSVGElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('renders <CheckCircle> when completed', () => {
    const { getAllByTestId } = render(<StepIcon completed icon={1} />);

    expect(getAllByTestId('CheckCircleIcon')).to.have.length(1);
  });

  it('renders <Warning> when error occurred', () => {
    const { getAllByTestId } = render(<StepIcon icon={1} error />);
    expect(getAllByTestId('WarningIcon')).to.have.length(1);
  });

  it('contains text "3" when position is "3"', () => {
    const { queryByText } = render(<StepIcon icon={3} />);
    expect(queryByText('3')).not.to.equal(null);
  });

  it('renders the custom icon', () => {
    const { container } = render(<StepIcon icon={<span className="my-icon" />} />);
    expect(container.querySelectorAll('.my-icon')).to.have.length(1);
  });
});
