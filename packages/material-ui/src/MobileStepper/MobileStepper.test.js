import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  describeConformance,
  getClasses,
  findOutermostIntrinsic,
} from '@material-ui/core/test-utils';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import Paper from '../Paper';
import Button from '../Button/Button';
import LinearProgress from '../LinearProgress';
import MobileStepper from './MobileStepper';

describe('<MobileStepper />', () => {
  let mount;
  let classes;
  const defaultProps = {
    steps: 2,
    nextButton: (
      <Button aria-label="next">
        Next
        <KeyboardArrowRight />
      </Button>
    ),
    backButton: (
      <Button aria-label="back">
        <KeyboardArrowLeft />
        Back
      </Button>
    ),
  };

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<MobileStepper {...defaultProps} />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<MobileStepper {...defaultProps} />, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a Paper with 0 elevation', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} />);
    assert.strictEqual(wrapper.find(Paper).props().elevation, 0);
  });

  it('should render with the bottom class if position prop is set to bottom', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} position="bottom" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.positionBottom), true);
  });

  it('should render with the top class if position prop is set to top', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} position="top" />);
    assert.strictEqual(findOutermostIntrinsic(wrapper).hasClass(classes.positionTop), true);
  });

  it('should render two buttons', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} />);
    assert.lengthOf(wrapper.find(Button), 2);
  });

  it('should render the back button', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} />);
    const backButton = wrapper.find('button[aria-label="back"]');
    assert.strictEqual(backButton.exists(), true);
    assert.lengthOf(backButton.find('svg[data-mui-test="KeyboardArrowLeftIcon"]'), 1);
  });

  it('should render next button', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} />);
    const nextButton = wrapper.find('button[aria-label="next"]');
    assert.strictEqual(nextButton.exists(), true);
    assert.lengthOf(nextButton.find('svg[data-mui-test="KeyboardArrowRightIcon"]'), 1);
  });

  it('should render two buttons and text displaying progress when supplied with variant text', () => {
    const wrapper = mount(
      <MobileStepper {...defaultProps} variant="text" activeStep={1} steps={3} />,
    );
    assert.strictEqual(findOutermostIntrinsic(wrapper).instance().textContent, 'Back2 / 3Next');
  });

  it('should render dots when supplied with variant dots', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} variant="dots" />);
    const outermost = findOutermostIntrinsic(wrapper);
    assert.lengthOf(outermost.children(), 3);
    assert.strictEqual(outermost.childAt(1).hasClass(classes.dots), true);
  });

  it('should render a dot for each step when using dots variant', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} variant="dots" />);
    assert.lengthOf(wrapper.find(`.${classes.dot}`), 2);
  });

  it('should render the first dot as active if activeStep is not set', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} variant="dots" />);
    assert.strictEqual(
      findOutermostIntrinsic(wrapper)
        .childAt(1)
        .childAt(0)
        .hasClass(classes.dotActive),
      true,
    );
  });

  it('should honor the activeStep prop', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} variant="dots" activeStep={1} />);
    assert.strictEqual(
      findOutermostIntrinsic(wrapper)
        .childAt(1)
        .childAt(1)
        .hasClass(classes.dotActive),
      true,
    );
  });

  it('should render a <LinearProgress /> when supplied with variant progress', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} variant="progress" />);
    assert.lengthOf(wrapper.find(LinearProgress), 1);
  });

  it('should calculate the <LinearProgress /> value correctly', () => {
    let wrapper = mount(<MobileStepper {...defaultProps} variant="progress" steps={3} />);
    let linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(linearProgressProps.value, 0);

    wrapper = mount(
      <MobileStepper {...defaultProps} variant="progress" steps={3} activeStep={1} />,
    );
    linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(linearProgressProps.value, 50);

    wrapper = mount(
      <MobileStepper {...defaultProps} variant="progress" steps={3} activeStep={2} />,
    );
    linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(linearProgressProps.value, 100);
  });
});
