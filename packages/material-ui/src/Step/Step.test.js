import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount } from '../test-utils';
import Step from './Step';
import StepConnector from '../StepConnector';

describe('<Step />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(
      <Step
        index={1}
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        role="Menuitem"
        orientation="horizontal"
      />,
    );
    const { style, role } = wrapper.props();
    assert.strictEqual(style.paddingRight, 200);
    assert.strictEqual(style.color, 'purple');
    assert.strictEqual(style.border, '1px solid tomato');
    assert.strictEqual(role, 'Menuitem');
  });

  describe('rendering children', () => {
    it('renders children', () => {
      const children = <h1 className="hello-world">Hello World</h1>;
      const wrapper = shallow(
        <Step label="Step One" index={1} orientation="horizontal">
          {children}
        </Step>,
      );
      assert.strictEqual(wrapper.find('.hello-world').length, 1);
    });

    it('renders children with all props passed through', () => {
      const children = [
        <h1 key={1} className="hello-world">
          Hello World
        </h1>,
        <p key={2} className="hay">
          How are you?
        </p>,
      ];
      const wrapper = shallow(
        <Step active={false} completed disabled index={0} orientation="horizontal">
          {children}
        </Step>,
      );
      const child1 = wrapper.find('.hello-world');
      const child2 = wrapper.find('.hay');
      [child1, child2].forEach(child => {
        assert.strictEqual(child.length, 1);
        assert.strictEqual(child.props().active, false);
        assert.strictEqual(child.props().completed, true);
        assert.strictEqual(child.props().disabled, true);
        assert.strictEqual(child.props().icon, 1);
      });
    });

    it('honours children overriding props passed through', () => {
      const children = (
        <h1 active={false} className="hello-world">
          Hello World
        </h1>
      );
      const wrapper = shallow(
        <Step active label="Step One" orientation="horizontal" index={0}>
          {children}
        </Step>,
      );
      const childWrapper = wrapper.find('.hello-world');
      assert.strictEqual(childWrapper.props().active, false);
    });

    it('should handle invalid children', () => {
      const wrapper = shallow(
        <Step label="Step One" index={1} orientation="horizontal">
          <h1 className="hello-world">Hello World</h1>
          {null}
        </Step>,
      );
      assert.strictEqual(wrapper.find('.hello-world').length, 1);
    });
  });

  describe('step connector', () => {
    it('should not exist when non-alternativeLabel Step', () => {
      const wrapper = shallow(
        <Step
          label="Step One"
          alternativeLabel={false}
          orientation="horizontal"
          connector={<StepConnector />}
        />,
      );
      assert.strictEqual(wrapper.find(StepConnector).exists(), false);
    });

    it('should exist when alternativeLabel Step', () => {
      const wrapper = shallow(
        <Step
          label="Step One"
          alternativeLabel
          orientation="horizontal"
          connector={<StepConnector />}
        />,
      );
      assert.strictEqual(wrapper.find(StepConnector).exists(), true);
    });

    it('should pass active prop to connector when next step is active', () => {
      const wrapper = shallow(
        <Step
          label="Step One"
          alternativeLabel
          orientation="horizontal"
          connector={<StepConnector />}
          nextStepState={{ active: true }}
        />,
      );

      assert.strictEqual(wrapper.find(StepConnector).props().active, true);
    });
  });
});
