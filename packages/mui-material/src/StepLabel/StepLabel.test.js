import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { stepIconClasses as iconClasses } from '@mui/material/StepIcon';
import StepLabel, { stepLabelClasses as classes } from '@mui/material/StepLabel';
import describeConformance from '../../test/describeConformance';

describe('<StepLabel />', () => {
  const { render } = createRenderer();

  describeConformance(<StepLabel>Step One</StepLabel>, () => ({
    classes,
    inheritComponent: 'span',
    muiName: 'MuiStepLabel',
    render,
    refInstanceof: window.HTMLSpanElement,
    testVariantProps: { error: true },
    slots: {
      label: { expectedClassName: classes.label },
      root: { expectedClassName: classes.root },
    },
    skip: ['componentProp', 'componentsProp'],
  }));

  describe('label content', () => {
    it('renders the label from children', () => {
      const { getByText } = render(<StepLabel>Step One</StepLabel>);
      getByText('Step One');
    });

    it('renders <StepIcon> with props passed through StepIconProps', () => {
      const stepIconProps = { error: true };

      const { container } = render(
        <Stepper alternativeLabel>
          <Step active completed>
            <StepLabel StepIconProps={stepIconProps}>Step One</StepLabel>
          </Step>
        </Stepper>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      // Should render WarningIcon instead of CheckCircleIcon because of { error: true } props
      expect(icon).to.have.attribute('data-testid').equal('WarningIcon');
    });
  });

  describe('prop: StepIconComponent', () => {
    it('should render', () => {
      function CustomizedIcon() {
        return <div data-testid="custom-icon" />;
      }
      const { container, getByTestId } = render(
        <Step active completed>
          <StepLabel StepIconComponent={CustomizedIcon}>Step One</StepLabel>
        </Step>,
      );

      const icon = container.querySelector(`.${classes.iconContainer}`);
      const label = container.querySelector(`.${classes.label}`);

      getByTestId('custom-icon');
      expect(icon).not.to.equal(null);
      expect(icon).not.to.have.attribute('data-testid').equal('CheckCircleIcon');
      expect(label).to.have.class(classes.active);
      expect(label).to.have.class(classes.completed);
    });

    it('should not render', () => {
      const { container } = render(
        <Step active completed>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.equal(null);
    });
  });

  describe('<Step /> prop: active', () => {
    it('renders <Typography> with the className active', () => {
      const { container } = render(
        <Step active>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const label = container.querySelector(`.${classes.label}`);
      expect(label).to.have.class(classes.active);
    });

    it('renders <StepIcon> with the <Step /> prop active set to true', () => {
      const { container } = render(
        <Stepper>
          <Step active>
            <StepLabel>Step One</StepLabel>
          </Step>
        </Stepper>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.have.class(iconClasses.active);
    });

    it('renders <Typography> without the className active', () => {
      const { container } = render(
        <Step active={false}>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const label = container.querySelector(`.${classes.label}`);
      expect(label).not.to.have.class(classes.active);
    });
  });

  describe('<Step /> prop: completed', () => {
    it('renders <Typography> with the className completed', () => {
      const { container } = render(
        <Step completed>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const label = container.querySelector(`.${classes.label}`);
      expect(label).to.have.class(classes.active);
    });

    it('renders <StepIcon> with the prop completed set to true', () => {
      const { container } = render(
        <Stepper>
          <Step completed>
            <StepLabel>Step One</StepLabel>
          </Step>
        </Stepper>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.have.class(iconClasses.active);
    });
  });

  describe('prop: error', () => {
    it('renders <Typography> with the className error', () => {
      const { container } = render(<StepLabel error>Step One</StepLabel>);

      const label = container.querySelector(`.${classes.label}`);
      expect(label).to.have.class(classes.error);
    });

    it('renders <StepIcon> with the prop error set to true', () => {
      const { container } = render(
        <Stepper>
          <Step>
            <StepLabel error>Step One</StepLabel>
          </Step>
        </Stepper>,
      );

      const icon = container.querySelector(`.${iconClasses.root}`);
      expect(icon).to.have.class(classes.error);
    });
  });

  describe('<Step /> prop: disabled', () => {
    it('renders with disabled className when disabled', () => {
      const { container } = render(
        <Step disabled>
          <StepLabel>Step One</StepLabel>
        </Step>,
      );

      const label = container.querySelector(`.${classes.root}`);
      expect(label).to.have.class(classes.disabled);
    });
  });

  describe('prop: optional = Optional Text', () => {
    it('creates a <Typography> component with text "Optional Text"', () => {
      const { getByText } = render(
        <StepLabel optional={<Typography variant="caption">Optional Text</Typography>}>
          Step One
        </StepLabel>,
      );

      getByText('Optional Text');
    });
  });

  describe('componentsProps: label', () => {
    it('spreads the props on the label element', () => {
      const { getByTestId } = render(
        <StepLabel
          componentsProps={{
            label: {
              'data-testid': 'label',
              className: 'step-label-test',
            },
          }}
        >
          Label
        </StepLabel>,
      );
      expect(getByTestId('label')).to.have.class('step-label-test');
    });
  });

  describe('renders <StepIcon> with the className completed', () => {
    it('renders with completed className when completed', () => {
      function CustomizedIcon() {
        return <div data-testid="custom-icon" />;
      }
      const { container } = render(
        <Step completed>
          <StepLabel StepIconComponent={CustomizedIcon}>Step One</StepLabel>
        </Step>,
      );

      const icon = container.querySelector(`.${classes.iconContainer}`);
      expect(icon).to.have.class(classes.completed);
    });
  });

  describe('renders <StepIcon> with the className active', () => {
    it('renders with active className when active', () => {
      function CustomizedIcon() {
        return <div data-testid="custom-icon" />;
      }
      const { container } = render(
        <Step active>
          <StepLabel StepIconComponent={CustomizedIcon}>Step One</StepLabel>
        </Step>,
      );

      const icon = container.querySelector(`.${classes.iconContainer}`);
      expect(icon).to.have.class(classes.active);
    });
  });
});
