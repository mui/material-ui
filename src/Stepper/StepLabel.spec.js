import React from 'react';
import { assert } from 'chai';
import { createShallow, createMount, getClasses } from '../test-utils';
import Typography from '../Typography';
import StepLabel from './StepLabel';
import StepIcon from './StepIcon';

describe('<StepLabel />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<StepLabel />);
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(
      <StepLabel
        orientation="horizontal"
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        data-myProp="hello"
      >
        My Label
      </StepLabel>,
    );
    const props = wrapper.props();
    assert.strictEqual(props.style.paddingRight, 200);
    assert.strictEqual(props.style.color, 'purple');
    assert.strictEqual(props.style.border, '1px solid tomato');
    assert.strictEqual(props['data-myProp'], 'hello');
  });

  describe('label content', () => {
    it('renders the label from children', () => {
      const wrapper = shallow(<StepLabel>Step One</StepLabel>);
      assert.strictEqual(wrapper.contains('Step One'), true);
    });

    it('renders <StepIcon>', () => {
      const wrapper = shallow(
        <StepLabel icon={1} active completed alternativeLabel>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.length, 1, 'should have an <StepIcon />');
      const props = stepIcon.props();
      assert.strictEqual(props.icon, 1, 'should set icon');
    });
  });

  describe('prop: active', () => {
    it('renders <Typography> with the className active', () => {
      const wrapper = shallow(<StepLabel active>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.labelActive), true);
    });

    it('renders <StepIcon> with the prop active set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} active>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().active, true, 'should set active');
    });

    it('renders <Typography> without the className active', () => {
      const wrapper = shallow(<StepLabel active={false}>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.labelActive), false);
    });
  });

  describe('prop: completed', () => {
    it('renders <Typography> with the className completed', () => {
      const wrapper = shallow(<StepLabel completed>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.labelCompleted), true);
    });

    it('renders <StepIcon> with the prop completed set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} completed>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().completed, true, 'should set completed');
    });
  });

  describe('prop: error', () => {
    it('renders <Typography> with the className error', () => {
      const wrapper = shallow(<StepLabel error>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.labelError), true);
    });

    it('renders <StepIcon> with the prop error set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} error>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().error, true, 'should set error');
    });
  });

  describe('prop: disabled', () => {
    it('renders with disabled className when disabled', () => {
      const wrapper = shallow(
        <StepLabel icon={1} disabled>
          Step One
        </StepLabel>,
      );
      assert.strictEqual(wrapper.hasClass(classes.disabled), true);
    });
  });

  describe('prop: classes', () => {
    it('should set iconContainer', () => {
      const wrapper = shallow(
        <StepLabel classes={{ iconContainer: 'my-custom-class' }} icon={1}>
          Step One
        </StepLabel>,
      );
      assert.include(
        wrapper
          .find('span')
          .at(1)
          .props().className,
        'my-custom-class',
      );
    });
  });

  describe('prop: optional = Optional Text', () => {
    it('creates a <Typography> component with text "Optional Text"', () => {
      const wrapper = shallow(
        <StepLabel icon={1} optional={<Typography variant="caption">Optional Text</Typography>}>
          Step One
        </StepLabel>,
      );
      assert.strictEqual(
        wrapper
          .find(Typography)
          .at(1)
          .contains('Optional Text'),
        true,
      );
    });
  });
});
