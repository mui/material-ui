/* eslint-disable flowtype/require-valid-file-annotation */
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
      assert.ok(wrapper.is('div'));
      const line = wrapper.find('span');
      assert.ok(line.length);
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
  });
});
