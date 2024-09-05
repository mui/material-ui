import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Paper, { paperClasses } from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MobileStepper, { mobileStepperClasses as classes } from '@mui/material/MobileStepper';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import describeConformance from '../../test/describeConformance';

describe('<MobileStepper />', () => {
  const { render } = createRenderer();
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

  describeConformance(<MobileStepper {...defaultProps} />, () => ({
    classes,
    inheritComponent: Paper,
    render,
    muiName: 'MuiMobileStepper',
    testVariantProps: { variant: 'progress' },
    testDeepOverrides: { slotName: 'dot', slotClassName: classes.dot },
    testStateOverrides: { prop: 'position', value: 'static', styleKey: 'positionStatic' },
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render a Paper with 0 elevation', () => {
    const { container } = render(<MobileStepper {...defaultProps} />);
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
    const { queryByTestId, getByRole } = render(<MobileStepper {...defaultProps} />);
    const backButton = getByRole('button', { name: 'back' });
    expect(backButton).not.to.equal(null);
    expect(queryByTestId('KeyboardArrowLeftIcon')).not.to.equal(null);
  });

  it('should render next button', () => {
    const { getByRole, queryByTestId } = render(<MobileStepper {...defaultProps} />);
    const nextButton = getByRole('button', { name: 'next' });
    expect(nextButton).not.to.equal(null);
    expect(queryByTestId('KeyboardArrowRightIcon')).not.to.equal(null);
  });

  it('should render two buttons and text displaying progress when supplied with variant text', () => {
    const { container } = render(
      <MobileStepper {...defaultProps} variant="text" activeStep={1} steps={3} />,
    );
    expect(container.firstChild.textContent).to.equal('Back2 / 3Next');
  });

  it('should render dots when supplied with variant dots', () => {
    const { container } = render(<MobileStepper {...defaultProps} variant="dots" />);
    expect(container.querySelectorAll(`.${classes.dots}`)).to.have.lengthOf(1);
  });

  it('should render a dot for each step when using dots variant', () => {
    const { container } = render(<MobileStepper {...defaultProps} variant="dots" />);
    expect(container.querySelectorAll(`.${classes.dot}`)).to.have.lengthOf(2);
  });

  it('should render the first dot as active if activeStep is not set', () => {
    const { container } = render(<MobileStepper {...defaultProps} variant="dots" />);
    expect(container.querySelector(`.${classes.dot}`)).to.has.class(classes.dotActive);
  });

  it('should honor the activeStep prop', () => {
    const { container } = render(<MobileStepper {...defaultProps} variant="dots" activeStep={1} />);
    expect(container.querySelectorAll(`.${classes.dot}`)[1]).to.has.class(classes.dotActive);
  });

  it('should render a <LinearProgress /> when supplied with variant progress', () => {
    render(<MobileStepper {...defaultProps} variant="progress" />);
    expect(screen.queryByRole('progressbar')).not.to.equal(null);
  });

  it('should calculate the <LinearProgress /> value correctly', () => {
    const { rerender } = render(<MobileStepper {...defaultProps} variant="progress" steps={3} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).to.equal('0');
    rerender(<MobileStepper {...defaultProps} variant="progress" steps={3} activeStep={1} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).to.equal('50');
    rerender(<MobileStepper {...defaultProps} variant="progress" steps={3} activeStep={2} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).to.equal('100');
  });

  it('should set value correctly when steps is set to 1', () => {
    const { getByRole } = render(<MobileStepper {...defaultProps} variant="progress" steps={1} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.getAttribute('aria-valuenow')).to.equal('100');
    fireEvent.click(getByRole('button', { name: 'next' }));
    expect(progressBar.getAttribute('aria-valuenow')).to.equal('100');
    fireEvent.click(getByRole('button', { name: 'back' }));
    expect(progressBar.getAttribute('aria-valuenow')).to.equal('100');
  });

  it('should set value correctly when steps is updated between 1 & 2', () => {
    const { rerender } = render(<MobileStepper {...defaultProps} variant="progress" steps={1} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar.getAttribute('aria-valuenow')).to.equal('100');
    rerender(<MobileStepper {...defaultProps} variant="progress" steps={2} />);
    expect(progressBar.getAttribute('aria-valuenow')).to.equal('0');
    rerender(<MobileStepper {...defaultProps} variant="progress" steps={1} />);
    expect(progressBar.getAttribute('aria-valuenow')).to.equal('100');
  });
});
