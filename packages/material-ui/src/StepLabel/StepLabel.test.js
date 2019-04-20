import React from 'react';
import { assert } from 'chai';
import {
  createShallow,
  createMount,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import Typography from '../Typography';
import StepIcon from '../StepIcon';
import StepLabel from './StepLabel';

describe('<StepLabel />', () => {
  let shallow;
  let classes;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<StepLabel />);
    mount = createMount({ strict: true });
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<StepLabel />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('merges styles into the root node', () => {
    const wrapper = shallow(
      <StepLabel
        orientation="horizontal"
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
      >
        My Label
      </StepLabel>,
    );
    const props = wrapper.props();
    assert.strictEqual(props.style.paddingRight, 200);
    assert.strictEqual(props.style.color, 'purple');
    assert.strictEqual(props.style.border, '1px solid tomato');
  });

  describe('label content', () => {
    it('renders the label from children', () => {
      const wrapper = shallow(<StepLabel>Step One</StepLabel>);
      assert.strictEqual(wrapper.contains('Step One'), true);
    });

    it('renders <StepIcon>', () => {
      const stepIconProps = { prop1: 'value1', prop2: 'value2' };
      const wrapper = shallow(
        <StepLabel icon={1} active completed alternativeLabel StepIconProps={stepIconProps}>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.length, 1, 'should have an <StepIcon />');
      const props = stepIcon.props();
      assert.strictEqual(props.icon, 1, 'should set icon');
      assert.strictEqual(props.prop1, 'value1', 'should have inherited custom prop1');
      assert.strictEqual(props.prop2, 'value2', 'should have inherited custom prop2');
    });
  });

  describe('prop: StepIconComponent', () => {
    it('should render', () => {
      const CustomizedIcon = () => <div />;
      const wrapper = shallow(
        <StepLabel
          StepIconComponent={CustomizedIcon}
          active
          completed
          StepIconProps={{ prop1: 'value1', prop2: 'value2' }}
        >
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.length, 0);

      const customizedIcon = wrapper.find(CustomizedIcon);
      assert.strictEqual(customizedIcon.length, 1);
      const props = customizedIcon.props();
      assert.strictEqual(props.prop1, 'value1');
      assert.strictEqual(props.prop2, 'value2');
      assert.strictEqual(props.completed, true);
      assert.strictEqual(props.active, true);
    });

    it('should not render', () => {
      const wrapper = shallow(
        <StepLabel active completed>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.length, 0);
    });
  });

  describe('prop: active', () => {
    it('renders <Typography> with the className active', () => {
      const wrapper = shallow(<StepLabel active>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.active), true);
    });

    it('renders <StepIcon> with the prop active set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} active>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().active, true);
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
      assert.strictEqual(text.hasClass(classes.completed), true);
    });

    it('renders <StepIcon> with the prop completed set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} completed>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().completed, true);
    });
  });

  describe('prop: error', () => {
    it('renders <Typography> with the className error', () => {
      const wrapper = shallow(<StepLabel error>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      assert.strictEqual(text.hasClass(classes.error), true);
    });

    it('renders <StepIcon> with the prop error set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} error>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      assert.strictEqual(stepIcon.props().error, true);
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
