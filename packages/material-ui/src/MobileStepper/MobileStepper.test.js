import * as React from 'react';
import { expect } from 'chai';
import {
  getClasses,
  createMount,
  createClientRender,
  describeConformance,
  screen,
} from 'test/utils';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import Paper from '../Paper';
import Button from '../Button/Button';
import MobileStepper from './MobileStepper';

describe('<MobileStepper />', () => {
  const mount = createMount();
  const render = createClientRender();
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
    classes = getClasses(<MobileStepper {...defaultProps} />);
  });

  describeConformance(<MobileStepper {...defaultProps} />, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('should render a Paper with 0 elevation', () => {
    const { container } = render(<MobileStepper {...defaultProps} />);
    const paperClasses = getClasses(<Paper elevation={0} />);
    expect(container.firstChild).to.have.class(paperClasses.elevation0);
  });

  it('should render with the bottom class if position prop is set to bottom', () => {
    const { container } = render(<MobileStepper {...defaultProps} position="bottom" />);
    expect(container.firstChild).to.have.class(classes.positionBottom);
  });

  it('should render with the top class if position prop is set to top', () => {
    const { container } = render(<MobileStepper {...defaultProps} position="top" />);
    expect(container.firstChild).to.have.class(classes.positionTop);
  });

  it('should render two buttons', () => {
    render(<MobileStepper {...defaultProps} />);
    expect(screen.getAllByRole('button')).to.have.lengthOf(2);
  });

  it('should render the back button', () => {
    const { container } = render(<MobileStepper {...defaultProps} />);
    const backButton = container.firstChild.querySelector('button[aria-label="back"]');
    expect(backButton).to.not.equal(null);
    expect(backButton.querySelector('svg[data-testid="KeyboardArrowLeftIcon"]')).to.not.equal(null);
  });

  it('should render next button', () => {
    const { container } = render(<MobileStepper {...defaultProps} />);
    const nextButton = container.firstChild.querySelector('button[aria-label="next"]');
    expect(nextButton).to.not.equal(null);
    expect(nextButton.querySelector('svg[data-testid="KeyboardArrowRightIcon"]')).to.not.equal(
      null,
    );
  });

  it('should render two buttons and text displaying progress when supplied with variant text', () => {
    const { container } = render(
      <MobileStepper {...defaultProps} variant="text" activeStep={1} steps={3} />,
    );
    expect(container.firstChild.textContent).to.equal('Back2 / 3Next');
  });

  it('should render dots when supplied with variant dots', () => {
    const { container } = render(<MobileStepper {...defaultProps} variant="dots" />);
    expect(container.firstChild.children).to.have.lengthOf(3);
    expect(container.firstChild.children[1]).to.has.class(classes.dots);
  });

  it('should render a dot for each step when using dots variant', () => {
    const { container } = render(<MobileStepper {...defaultProps} variant="dots" />);
    expect(container.firstChild.querySelectorAll(`.${classes.dot}`)).to.have.lengthOf(2);
  });

  it('should render the first dot as active if activeStep is not set', () => {
    const { container } = render(<MobileStepper {...defaultProps} variant="dots" />);
    expect(container.firstChild.children[1].firstChild).to.has.class(classes.dotActive);
  });

  it('should honor the activeStep prop', () => {
    const { container } = render(<MobileStepper {...defaultProps} variant="dots" activeStep={1} />);
    expect(container.firstChild.children[1].children[1]).to.has.class(classes.dotActive);
  });

  it('should render a <LinearProgress /> when supplied with variant progress', () => {
    render(<MobileStepper {...defaultProps} variant="progress" />);
    expect(screen.queryByRole('progressbar')).to.not.equal(null);
  });

  it('should calculate the <LinearProgress /> value correctly', () => {
    const { rerender } = render(<MobileStepper {...defaultProps} variant="progress" steps={3} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).to.equal('0');
    rerender(<MobileStepper {...defaultProps} variant="progress" steps={3} activeStep={1} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).to.equal('50');
    rerender(<MobileStepper {...defaultProps} variant="progress" steps={3} activeStep={2} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).to.equal('100');
  });
});
