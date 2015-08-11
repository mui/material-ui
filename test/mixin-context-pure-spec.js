import React from 'react/addons';
import ContextPure from 'mixins/context-pure';

const TestUtils = React.addons.TestUtils;

const GrandChildComponent = React.createClass({
  mixins: [ContextPure],

  contextTypes: {
    testContext: React.PropTypes.object,
  },

  statics: {
    getContextProps(context) {
      return {
        grandChildContextProp: context.testContext.grandChildContextProp,
      }
    },
  },

  renderCount: 0,

  render() {
    this.renderCount++;
    return <div />;
  },

  getRenderCount() {
    return this.renderCount;
  },
});

const ChildComponent = React.createClass({
  mixins: [ContextPure],

  contextTypes: {
    testContext: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      childState: 0,
    };
  },

  statics: {
    getContextProps(context) {
      return {
        childContextProp: context.testContext.childContextProp,
      }
    },
    getChildrenClasses() {
      return [
        GrandChildComponent,
      ];
    },
  },

  renderCount: 0,

  render() {
    this.renderCount++;
    return <GrandChildComponent ref="grandChild" />;
  },

  getGrandChildRenderCount() {
    return this.refs.grandChild.getRenderCount();
  },

  getRenderCount() {
    return this.renderCount;
  },

  updateState(childState) {
    this.setState({childState});
  },
});

const ParentComponent = React.createClass({

  childContextTypes: {
    testContext: React.PropTypes.object,
  },

  getChildContext() {
    return {
      testContext: {
        childContextProp: this.state.childContextProp,
        grandChildContextProp: this.state.grandChildContextProp,
      },
    };
  },

  getInitialState() {
    return {
      childProp: 0,
      childContextProp: 0,
      grandChildContextProp: 0,
    };
  },

  renderCount: 0,

  render() {
    this.renderCount++;
    return <ChildComponent ref="child" testProp={this.state.childProp} />;
  },

  getChildRenderCount() {
    return this.refs.child.getRenderCount();
  },

  getGrandChildRenderCount() {
    return this.refs.child.getGrandChildRenderCount();
  },

  getRenderCount() {
    return this.renderCount;
  },

  updateChildState(childState) {
    this.refs.child.updateState(childState);
  },

  updateChildContextProp(childContextProp) {
    this.setState({childContextProp});
  },

  updateGrandChildContextProp(grandChildContextProp) {
    this.setState({grandChildContextProp});
  },

  updateChildProp(childProp) {
    this.setState({childProp});
  },
});

describe('Mixin-ContextPure', () => {
  let parentElement;

  beforeEach(() => {
    parentElement = TestUtils.renderIntoDocument(<ParentComponent />);
  });

  it('should not render when context is updated but did not change', () => {
    parentElement.updateChildContextProp(0);
    parentElement.getRenderCount().should.equal(2);
    parentElement.getChildRenderCount().should.equal(1);
    parentElement.getGrandChildRenderCount().should.equal(1);
  });

  it('should not render when prop is updated but did not change', () => {
    parentElement.updateChildProp(0);
    parentElement.getRenderCount().should.equal(2);
    parentElement.getChildRenderCount().should.equal(1);
    parentElement.getGrandChildRenderCount().should.equal(1);
  });

  it('should not render when state is updated but did not change', () => {
    parentElement.updateChildState(0);
    parentElement.getRenderCount().should.equal(1);
    parentElement.getChildRenderCount().should.equal(1);
    parentElement.getGrandChildRenderCount().should.equal(1);
  });

  it('should render when context props change', () => {
    parentElement.updateChildContextProp(1);
    parentElement.getRenderCount().should.equal(2);
    parentElement.getChildRenderCount().should.equal(2);
    parentElement.getGrandChildRenderCount().should.equal(1);
  });

  it('should render when props change', () => {
    parentElement.updateChildProp(1);
    parentElement.getRenderCount().should.equal(2);
    parentElement.getChildRenderCount().should.equal(2);
    parentElement.getGrandChildRenderCount().should.equal(1);
  });

  it('should render when state change', () => {
    parentElement.updateChildState(1);
    parentElement.getRenderCount().should.equal(1);
    parentElement.getChildRenderCount().should.equal(2);
    parentElement.getGrandChildRenderCount().should.equal(1);
  });

  it('should render grandchild when grandchild context props change', () => {
    parentElement.updateGrandChildContextProp(1);
    parentElement.getRenderCount().should.equal(2);
    parentElement.getChildRenderCount().should.equal(2);
    parentElement.getGrandChildRenderCount().should.equal(2);
  });

});
