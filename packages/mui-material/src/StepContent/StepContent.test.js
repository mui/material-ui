import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { collapseClasses } from '@mui/material/Collapse';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepContent, { stepContentClasses as classes } from '@mui/material/StepContent';
import describeConformance from '../../test/describeConformance';

describe('<StepContent />', () => {
  const { render } = createRenderer();

  describeConformance(<StepContent />, () => ({
    classes,
    inheritComponent: 'div',
    muiName: 'MuiStepContent',
    refInstanceof: window.HTMLDivElement,
    render: (node) => {
      const { container, ...other } = render(
        <Stepper orientation="vertical">
          <Step>{node}</Step>
        </Stepper>,
      );
      return { container: container.firstChild.firstChild, ...other };
    },
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));

  it('renders children inside an Collapse component', () => {
    const { container, getByText } = render(
      <Stepper orientation="vertical">
        <Step>
          <StepContent>
            <div className="test-content">This is my content!</div>
          </StepContent>
        </Step>
      </Stepper>,
    );

    const collapse = container.querySelector(`.${collapseClasses.root}`);
    const innerDiv = container.querySelector(`.test-content`);

    expect(collapse).not.to.equal(null);
    expect(innerDiv).not.to.equal(null);
    getByText('This is my content!');
  });

  describe('prop: transitionDuration', () => {
    it('should use default Collapse component', () => {
      const { container } = render(
        <Stepper orientation="vertical">
          <Step>
            <StepContent>
              <div />
            </StepContent>
          </Step>
        </Stepper>,
      );

      const collapse = container.querySelector(`.${collapseClasses.root}`);
      expect(collapse).not.to.equal(null);
    });

    it('should use custom TransitionComponent', () => {
      function TransitionComponent() {
        return <div data-testid="custom-transition" />;
      }

      const { container, getByTestId } = render(
        <Stepper orientation="vertical">
          <Step>
            <StepContent TransitionComponent={TransitionComponent}>
              <div />
            </StepContent>
          </Step>
        </Stepper>,
      );

      const collapse = container.querySelector(`.${collapseClasses.container}`);
      expect(collapse).to.equal(null);
      getByTestId('custom-transition');
    });
  });
});
