import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import StepConnector from './StepConnector';

describe('<StepConnector />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  describe('rendering', () => {
    it('renders a div containing a span', () => {
      const wrapper = shallow(<StepConnector orientation="horizontal" />);
      assert.strictEqual(wrapper.type(), 'div');
      const line = wrapper.find('span');
      assert.strictEqual(line.length, 1);
    });

    it('has the class lineHorizontal when horizontal', () => {
      const wrapper = shallow(<StepConnector orientation="horizontal" />);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineHorizontal');
    });

    it('has the class lineVertical when vertical', () => {
      const wrapper = shallow(<StepConnector orientation="vertical" />);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineVertical');
    });

    it('has the class lineActive when active', () => {
      const wrapper = shallow(<StepConnector active />);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineActive');
    });

    it('has the class lineCompleted when completed', () => {
      const wrapper = shallow(<StepConnector completed />);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineCompleted');
    });

    it('has the class lineDisabled when disabled', () => {
      const wrapper = shallow(<StepConnector disabled />);
      const line = wrapper.find('span');
      assert.include(line.props().className, 'StepConnector-lineDisabled');
    });
  });
});
