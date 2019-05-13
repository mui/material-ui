import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, describeConformance } from '@material-ui/core/test-utils';
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
    assert.strictEqual(checkCircle.length, 1, 'should have an <CheckCircle />');
  });

  it('renders <Warning> when error occurred', () => {
    const wrapper = mount(<StepIcon icon={1} error />);
    const warning = wrapper.find('svg[data-mui-test="WarningIcon"]');
    assert.strictEqual(warning.length, 1, 'should have an <Warning />');
  });

  it('renders a <SvgIcon>', () => {
    const wrapper = shallow(<StepIcon icon={1} />);
    assert.strictEqual(wrapper.find(SvgIcon).length, 1);
  });

  it('contains text "3" when position is "3"', () => {
    const wrapper = shallow(<StepIcon icon={3} />);
    assert.strictEqual(wrapper.find('text').text(), '3');
  });

  it('renders the custom icon', () => {
    const wrapper = shallow(<StepIcon icon={<span className="my-icon" />} />);
    assert.strictEqual(wrapper.find('.my-icon').length, 1, 'should have the custom icon');
  });
});
