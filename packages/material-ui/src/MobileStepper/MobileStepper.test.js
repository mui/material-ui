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
      <Button>
        Next
        <KeyboardArrowRight />
      </Button>
    ),
    backButton: (
      <Button>
        <KeyboardArrowLeft />
        Back
      </Button>
    ),
  };

  before(() => {
    mount = createMount();
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
    testComponentPropWith: false,
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
    const backButton = findOutermostIntrinsic(wrapper).childAt(0);
    assert.strictEqual(backButton.text(), 'Back');
    assert.lengthOf(backButton.find(KeyboardArrowLeft), 1);
  });

  it('should render next button', () => {
    const wrapper = mount(<MobileStepper {...defaultProps} />);
    const nextButton = findOutermostIntrinsic(wrapper).childAt(2);
    assert.strictEqual(nextButton.childAt(0).text(), 'Next');
    assert.lengthOf(nextButton.find(KeyboardArrowRight), 1);
  });

  it('should render backButton custom text', () => {
    const wrapper = mount(
      <MobileStepper
        {...defaultProps}
        backButton={
          <Button>
            <KeyboardArrowLeft />
            Past
          </Button>
        }
      />,
    );
    assert.strictEqual(
      findOutermostIntrinsic(wrapper)
        .childAt(0)
        .text(),
      'Past',
    );
  });

  it('should render nextButton custom text', () => {
    const wrapper = mount(
      <MobileStepper
        {...defaultProps}
        nextButton={
          <Button>
            Future
            <KeyboardArrowRight />
          </Button>
        }
      />,
    );
    assert.strictEqual(
      findOutermostIntrinsic(wrapper)
        .childAt(2)
        .text(),
      'Future',
    );
  });

  it('should render disabled backButton', () => {
    const wrapper = mount(
      <MobileStepper {...defaultProps} backButton={<Button disabled>back</Button>} />,
    );
    const backButton = findOutermostIntrinsic(wrapper).childAt(0);
    assert.strictEqual(backButton.props().disabled, true);
  });

  it('should render disabled nextButton', () => {
    const wrapper = mount(
      <MobileStepper {...defaultProps} nextButton={<Button disabled>back</Button>} />,
    );
    const nextButton = findOutermostIntrinsic(wrapper).childAt(2);
    assert.strictEqual(nextButton.props().disabled, true);
  });

  it('should render two buttons and text displaying progress when supplied with variant text', () => {
    const wrapper = mount(
      <MobileStepper {...defaultProps} variant="text" activeStep={1} steps={3} />,
    );
    assert.strictEqual(wrapper.text(), 'Back2 / 3Next');
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
