import React from 'react';
import { assert } from 'chai';
import {
  createMount,
  createShallow,
  describeConformance,
  getClasses,
} from '@material-ui/core/test-utils';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import Paper from '../Paper';
import Button from '../Button/Button';
import LinearProgress from '../LinearProgress';
import MobileStepper from './MobileStepper';

describe('<MobileStepper />', () => {
  let mount;
  let shallow;
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
    shallow = createShallow({ dive: true });
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
    const wrapper = shallow(<MobileStepper position="bottom" {...defaultProps} />);
    assert.strictEqual(wrapper.hasClass(classes.positionBottom), true);
  });

  it('should render with the top class if position prop is set to top', () => {
    const wrapper = shallow(<MobileStepper position="top" {...defaultProps} />);
    assert.strictEqual(wrapper.hasClass(classes.positionTop), true);
  });

  it('should render two buttons', () => {
    const wrapper = shallow(<MobileStepper {...defaultProps} />);
    assert.lengthOf(wrapper.find(Button), 2);
  });

  it('should render the back button', () => {
    const wrapper = shallow(<MobileStepper {...defaultProps} />);
    const backButton = wrapper.childAt(0);
    assert.strictEqual(backButton.childAt(1).text(), 'Back');
    assert.lengthOf(backButton.find(KeyboardArrowLeft), 1);
  });

  it('should render next button', () => {
    const wrapper = shallow(<MobileStepper {...defaultProps} />);
    const nextButton = wrapper.childAt(2);
    assert.strictEqual(nextButton.childAt(0).text(), 'Next');
    assert.lengthOf(nextButton.find(KeyboardArrowRight), 1);
  });

  it('should render backButton custom text', () => {
    const props = {
      steps: defaultProps.steps,
      nextButton: defaultProps.nextButton,
      backButton: (
        <Button>
          <KeyboardArrowLeft />
          Past
        </Button>
      ),
    };
    const wrapper = shallow(<MobileStepper {...props} />);
    assert.strictEqual(
      wrapper
        .childAt(0)
        .childAt(1)
        .text(),
      'Past',
    );
  });

  it('should render nextButton custom text', () => {
    const props = {
      steps: defaultProps.steps,
      nextButton: (
        <Button>
          Future
          <KeyboardArrowRight />
        </Button>
      ),
      backButton: defaultProps.backButton,
    };
    const wrapper = shallow(<MobileStepper {...props} />);
    assert.strictEqual(
      wrapper
        .childAt(2)
        .childAt(0)
        .text(),
      'Future',
    );
  });

  it('should render disabled backButton', () => {
    const props = {
      steps: defaultProps.steps,
      nextButton: defaultProps.nextButton,
      backButton: <Button disabled>back</Button>,
    };
    const wrapper = shallow(<MobileStepper {...props} />);
    const backButton = wrapper.childAt(0);
    assert.strictEqual(backButton.props().disabled, true);
  });

  it('should render disabled nextButton', () => {
    const props = {
      steps: defaultProps.steps,
      nextButton: <Button disabled>back</Button>,
      backButton: defaultProps.backButton,
    };
    const wrapper = shallow(<MobileStepper {...props} />);
    const nextButton = wrapper.childAt(2);
    assert.strictEqual(nextButton.props().disabled, true);
  });

  it('should render just two buttons when supplied with variant text', () => {
    const wrapper = shallow(<MobileStepper variant="text" {...defaultProps} />);
    assert.lengthOf(wrapper.children(), 2);
  });

  it('should render dots when supplied with variant dots', () => {
    const wrapper = shallow(<MobileStepper variant="dots" {...defaultProps} />);
    assert.lengthOf(wrapper.children(), 3);
    assert.strictEqual(wrapper.childAt(1).hasClass(classes.dots), true);
  });

  it('should render a dot for each step when using dots variant', () => {
    const wrapper = shallow(<MobileStepper variant="dots" {...defaultProps} />);
    assert.lengthOf(wrapper.find(`.${classes.dot}`), 2);
  });

  it('should render the first dot as active if activeStep is not set', () => {
    const wrapper = shallow(<MobileStepper variant="dots" {...defaultProps} />);
    assert.strictEqual(
      wrapper
        .childAt(1)
        .childAt(0)
        .hasClass(classes.dotActive),
      true,
    );
  });

  it('should honor the activeStep prop', () => {
    const wrapper = shallow(<MobileStepper variant="dots" activeStep={1} {...defaultProps} />);
    assert.strictEqual(
      wrapper
        .childAt(1)
        .childAt(1)
        .hasClass(classes.dotActive),
      true,
    );
  });

  it('should render a <LinearProgress /> when supplied with variant progress', () => {
    const wrapper = shallow(<MobileStepper variant="progress" {...defaultProps} />);
    assert.lengthOf(wrapper.find(LinearProgress), 1);
  });

  it('should calculate the <LinearProgress /> value correctly', () => {
    const props = { backButton: defaultProps.backButton, nextButton: defaultProps.nextButton };
    let wrapper = shallow(<MobileStepper variant="progress" steps={3} {...props} />);
    let linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(linearProgressProps.value, 0);

    wrapper = shallow(<MobileStepper variant="progress" steps={3} activeStep={1} {...props} />);
    linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(linearProgressProps.value, 50);

    wrapper = shallow(<MobileStepper variant="progress" steps={3} activeStep={2} {...props} />);
    linearProgressProps = wrapper.find(LinearProgress).props();
    assert.strictEqual(linearProgressProps.value, 100);
  });
});
