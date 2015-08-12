import React from 'react/addons';
import ContextPure from 'mixins/context-pure';

const TestUtils = React.addons.TestUtils;

const GrandChildComponent = React.createClass({
  mixins: [ContextPure],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  statics: {
    getContextProps(context) {
      return {
        grandChildThemeProp: context.muiTheme.grandChildThemeProp,
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
    muiTheme: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
      childState: 0,
    };
  },

  statics: {
    getContextProps(context) {
      return {
        childThemeProp: context.muiTheme.childThemeProp,
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
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: {
        childThemeProp: this.state.childThemeProp,
        grandChildThemeProp: this.state.grandChildThemeProp,
        static: this.state.staticTheme,
      },
    };
  },

  getInitialState() {
    return {
      childProp: 0,
      childThemeProp: 0,
      grandChildThemeProp: 0,
      staticTheme: false,
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

  setStaticTheme(value) {
    this.setState({
      staticTheme: value,
    });
  },

  updateChildState(childState) {
    this.refs.child.updateState(childState);
  },

  updateChildContextProp(childThemeProp) {
    this.setState({childThemeProp});
  },

  updateGrandChildContextProp(grandChildThemeProp) {
    this.setState({grandChildThemeProp});
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

  describe('when muiTheme.static not set', () => {

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

  describe('when muiTheme.static is true', () => {
    beforeEach(() => {
      parentElement.setStaticTheme(true);
    });

    it('should not render when context is updated but did not change', () => {
      parentElement.updateChildContextProp(1);
      parentElement.getRenderCount().should.equal(3);
      parentElement.getChildRenderCount().should.equal(1);
      parentElement.getGrandChildRenderCount().should.equal(1);
    });

    it('should not render when prop is updated but did not change', () => {
      parentElement.updateChildProp(0);
      parentElement.getRenderCount().should.equal(3);
      parentElement.getChildRenderCount().should.equal(1);
      parentElement.getGrandChildRenderCount().should.equal(1);
    });

    it('should not render when state is updated but did not change', () => {
      parentElement.updateChildState(0);
      parentElement.getRenderCount().should.equal(2);
      parentElement.getChildRenderCount().should.equal(1);
      parentElement.getGrandChildRenderCount().should.equal(1);
    });

    it('should not render when context props change', () => {
      parentElement.updateChildContextProp(1);
      parentElement.getRenderCount().should.equal(3);
      parentElement.getChildRenderCount().should.equal(1);
      parentElement.getGrandChildRenderCount().should.equal(1);
    });

    it('should not render grandchild when grandchild context props change', () => {
      parentElement.updateGrandChildContextProp(1);
      parentElement.getRenderCount().should.equal(3);
      parentElement.getChildRenderCount().should.equal(1);
      parentElement.getGrandChildRenderCount().should.equal(1);
    });

    it('should render when props change', () => {
      parentElement.updateChildProp(1);
      parentElement.getRenderCount().should.equal(3);
      parentElement.getChildRenderCount().should.equal(2);
      parentElement.getGrandChildRenderCount().should.equal(1);
    });

    it('should render when state change', () => {
      parentElement.updateChildState(1);
      parentElement.getRenderCount().should.equal(2);
      parentElement.getChildRenderCount().should.equal(2);
      parentElement.getGrandChildRenderCount().should.equal(1);
    });


  });



});
