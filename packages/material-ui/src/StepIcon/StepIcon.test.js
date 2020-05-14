import * as React from 'react';
import { expect } from 'chai';
import { createShallow } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import StepIcon from './StepIcon';
import SvgIcon from '../SvgIcon';

describe('<StepIcon />', () => {
  let shallow;
  const mount = createMount();

  before(() => {
    shallow = createShallow({ dive: true });
  });

  describeConformance(<StepIcon icon={1} />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.SVGSVGElement,
  }));

  it('renders <CheckCircle> when completed', () => {
    const wrapper = mount(<StepIcon icon={1} completed />);
    const checkCircle = wrapper.find('svg[data-mui-test="CheckCircleIcon"]');
    expect(checkCircle.length).to.equal(1);
  });

  it('renders <Warning> when error occurred', () => {
    const wrapper = mount(<StepIcon icon={1} error />);
    const warning = wrapper.find('svg[data-mui-test="WarningIcon"]');
    expect(warning.length).to.equal(1);
  });

  it('renders a <SvgIcon>', () => {
    const wrapper = shallow(<StepIcon icon={1} />);
    expect(wrapper.find(SvgIcon).length).to.equal(1);
  });

  it('contains text "3" when position is "3"', () => {
    const wrapper = shallow(<StepIcon icon={3} />);
    expect(wrapper.find('text').text()).to.equal('3');
  });

  it('renders the custom icon', () => {
    const wrapper = shallow(<StepIcon icon={<span className="my-icon" />} />);
    expect(wrapper.find('.my-icon').length).to.equal(1);
  });
});
