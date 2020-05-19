import * as React from 'react';
import { expect } from 'chai';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import StepIcon from './StepIcon';

describe('<StepIcon />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformance(<StepIcon icon={1} />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.SVGSVGElement,
  }));

  it('renders <CheckCircle> when completed', () => {
    const { container } = render(<StepIcon icon={1} completed />);
    expect(container.querySelectorAll('svg[data-mui-test="CheckCircleIcon"]')).to.have.length(1);
  });

  it('renders <Warning> when error occurred', () => {
    const { container } = render(<StepIcon icon={1} error />);
    expect(container.querySelectorAll('svg[data-mui-test="WarningIcon"]')).to.have.length(1);
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
