import * as React from 'react';
import { expect } from 'chai';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Collapse from '../Collapse';
import StepContent from './StepContent';

describe('<StepContent />', () => {
  let classes;
  let shallow;
  // StrictModeViolation: uses Collapse
  const mount = createMount({ strict: false });
  const defaultProps = {
    orientation: 'vertical',
  };

  before(() => {
    classes = getClasses(<StepContent />);
    shallow = createShallow({ dive: true });
  });

  describeConformance(<StepContent {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  it('merges styles and other props into the root node', () => {
    const wrapper = shallow(
      <StepContent
        style={{ paddingRight: 200, color: 'purple', border: '1px solid tomato' }}
        {...defaultProps}
      >
        Lorem ipsum
      </StepContent>,
    );
    const props = wrapper.props();
    expect(props.style.paddingRight).to.equal(200);
    expect(props.style.color).to.equal('purple');
    expect(props.style.border).to.equal('1px solid tomato');
  });

  it('renders children inside an Collapse component', () => {
    const wrapper = shallow(
      <StepContent {...defaultProps}>
        <div className="test-content">This is my content!</div>
      </StepContent>,
    );
    const collapse = wrapper.find(Collapse);
    expect(collapse.length).to.equal(1);
    const content = collapse.find('.test-content');
    expect(content.length).to.equal(1);
    expect(content.props().children).to.equal('This is my content!');
  });

  describe('prop: transitionDuration', () => {
    it('should apply the auto prop if supported', () => {
      const wrapper = shallow(
        <StepContent {...defaultProps}>
          <div />
        </StepContent>,
      );
      expect(wrapper.find(Collapse).props().timeout).to.equal('auto');
    });

    it('should not apply the auto prop if not supported', () => {
      const TransitionComponent = (props) => <div {...props} />;
      const wrapper = shallow(
        <StepContent {...defaultProps} TransitionComponent={TransitionComponent}>
          <div />
        </StepContent>,
      );
      expect(wrapper.find(TransitionComponent).props().timeout).to.equal(undefined);
    });
  });
});
