import * as React from 'react';
import { expect } from 'chai';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import StepIcon from './StepIcon';
import SvgIcon from '../SvgIcon';

describe('<StepIcon />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
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
