import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from '@material-ui/core/test-utils';
import { createClientRender } from 'test/utils/createClientRender';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Collapse from '../Collapse';
import Stepper from '../Stepper';
import Step from '../Step';
import StepContent from './StepContent';

describe('<StepContent />', () => {
  let stepContentClasses;
  let collapseClasses;
  // StrictModeViolation: uses Collapse
  const mount = createMount({ strict: false });
  const render = createClientRender({ strict: false });

  before(() => {
    stepContentClasses = getClasses(<StepContent />);
    collapseClasses = getClasses(<Collapse />);
  });

  // describeConformance(
  //   <Stepper orientation="vertical">
  //     <Step>
  //       <StepContent />
  //     </Step>
  //   </Stepper>,
  //   () => ({
  //     classes: stepContentClasses,
  //     inheritComponent: 'div',
  //     mount,
  //     refInstanceof: window.HTMLDivElement,
  //     skip: ['componentProp'],
  //   }),
  // );

  // describeConformance(<StepContent />, () => ({
  //   classes: stepContentClasses,
  //   inheritComponent: 'div',
  //   mount,
  //   refInstanceof: window.HTMLDivElement,
  //   skip: ['componentProp'],
  // }));

  it('merges styles and other props into the root node', () => {
    const { container } = render(
      <Stepper orientation="vertical">
        <Step>
          <StepContent style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}>
            Lorem ipsum
          </StepContent>
        </Step>
      </Stepper>,
    );

    const root = container.querySelector(`.${stepContentClasses.root}`);
    const styles = window.getComputedStyle(root);

    expect(styles['padding-right']).to.equal('200px');
    expect(styles.color).to.equal('purple');
    expect(styles.border).to.equal('1px solid tomato');
  });

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

    const collapse = container.querySelector(`.${collapseClasses.container}`);
    const innerDiv = container.querySelector(`.test-content`);

    expect(collapse).to.not.equal(null);
    expect(innerDiv).to.not.equal(null);
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

      const collapse = container.querySelector(`.${collapseClasses.container}`);
      expect(collapse).to.not.equal(null);
    });

    it('should use custom TransitionComponent', () => {
      const TransitionComponent = () => <div data-testid="custom-transition" />;

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
