import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Typography from '../Typography';
import StepIcon from '../StepIcon';
import StepLabel from './StepLabel';

describe('<StepLabel />', () => {
  let shallow;
  let classes;
  const mount = createMount();

  before(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<StepLabel />);
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
    expect(props.style.paddingRight).to.equal(200);
    expect(props.style.color).to.equal('purple');
    expect(props.style.border).to.equal('1px solid tomato');
  });

  describe('label content', () => {
    it('renders the label from children', () => {
      const wrapper = shallow(<StepLabel>Step One</StepLabel>);
      expect(wrapper.contains('Step One')).to.equal(true);
    });

    it('renders <StepIcon>', () => {
      const stepIconProps = { prop1: 'value1', prop2: 'value2' };
      const wrapper = shallow(
        <StepLabel icon={1} active completed alternativeLabel StepIconProps={stepIconProps}>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      expect(stepIcon.length).to.equal(1);
      const props = stepIcon.props();
      expect(props.icon).to.equal(1);
      expect(props.prop1).to.equal('value1');
      expect(props.prop2).to.equal('value2');
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
      expect(stepIcon.length).to.equal(0);

      const customizedIcon = wrapper.find(CustomizedIcon);
      expect(customizedIcon.length).to.equal(1);
      const props = customizedIcon.props();
      expect(props.prop1).to.equal('value1');
      expect(props.prop2).to.equal('value2');
      expect(props.completed).to.equal(true);
      expect(props.active).to.equal(true);
    });

    it('should not render', () => {
      const wrapper = shallow(
        <StepLabel active completed>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      expect(stepIcon.length).to.equal(0);
    });
  });

  describe('prop: active', () => {
    it('renders <Typography> with the className active', () => {
      const wrapper = shallow(<StepLabel active>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      expect(text.hasClass(classes.active)).to.equal(true);
    });

    it('renders <StepIcon> with the prop active set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} active>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      expect(stepIcon.props().active).to.equal(true);
    });

    it('renders <Typography> without the className active', () => {
      const wrapper = shallow(<StepLabel active={false}>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      expect(text.hasClass(classes.labelActive)).to.equal(false);
    });
  });

  describe('prop: completed', () => {
    it('renders <Typography> with the className completed', () => {
      const wrapper = shallow(<StepLabel completed>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      expect(text.hasClass(classes.completed)).to.equal(true);
    });

    it('renders <StepIcon> with the prop completed set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} completed>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      expect(stepIcon.props().completed).to.equal(true);
    });
  });

  describe('prop: error', () => {
    it('renders <Typography> with the className error', () => {
      const wrapper = shallow(<StepLabel error>Step One</StepLabel>);
      const text = wrapper.find(Typography);
      expect(text.hasClass(classes.error)).to.equal(true);
    });

    it('renders <StepIcon> with the prop error set to true', () => {
      const wrapper = shallow(
        <StepLabel icon={1} error>
          Step One
        </StepLabel>,
      );
      const stepIcon = wrapper.find(StepIcon);
      expect(stepIcon.props().error).to.equal(true);
    });
  });

  describe('prop: disabled', () => {
    it('renders with disabled className when disabled', () => {
      const wrapper = shallow(
        <StepLabel icon={1} disabled>
          Step One
        </StepLabel>,
      );
      expect(wrapper.hasClass(classes.disabled)).to.equal(true);
    });
  });

  describe('prop: optional = Optional Text', () => {
    it('creates a <Typography> component with text "Optional Text"', () => {
      const wrapper = shallow(
        <StepLabel icon={1} optional={<Typography variant="caption">Optional Text</Typography>}>
          Step One
        </StepLabel>,
      );
      expect(wrapper.find(Typography).at(1).contains('Optional Text')).to.equal(true);
    });
  });
});
