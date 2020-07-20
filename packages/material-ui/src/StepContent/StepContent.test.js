import * as React from 'react';
import { expect } from 'chai';
import { getClasses } from 'test/utils';
import { createClientRender } from 'test/utils/createClientRender';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
import Collapse from '../Collapse';
import Stepper from '../Stepper';
import Step from '../Step';
import StepContent from './StepContent';

describe('<StepContent />', () => {
  let classes;
  let collapseClasses;
  const mount = createMount({ strict: true });
  const render = createClientRender();

  before(() => {
    classes = getClasses(<StepContent />);
    collapseClasses = getClasses(<Collapse />);
  });

  describeConformance(<StepContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount: (node) => {
      const wrapper = mount(
        <Stepper orientation="vertical">
          <Step>{node}</Step>
        </Stepper>,
      );
      return wrapper.find(Step).childAt(0).childAt(0).childAt(0);
    },
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'reactTestRenderer', 'refForwarding'],
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
