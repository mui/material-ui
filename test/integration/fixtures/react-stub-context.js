/* eslint-disable react/prefer-es6-class */
// "react-stub-context": "^0.3.0",

const React = require('react');

function stubContext(BaseComponent, context) {
  if (typeof context === 'undefined' || context === null) context = {};

  const contextTypes = {};

  try {
    Object.keys(context).forEach(function(key) {
      contextTypes[key] = React.PropTypes.any;
    });
  } catch (err) {
    throw new TypeError('createdStubbedContextComponent requires an object');
  }

  const StubbedContextParent = React.createClass({
    displayName: 'StubbedContextParent',
    propTypes: {
      children: React.PropTypes.node,
    },
    contextTypes: contextTypes,
    childContextTypes: contextTypes,
    getChildContext() {
      return context;
    },
    render() {
      return React.Children.only(this.props.children);
    },
  });

  const StubbedContextHandler = React.createClass({
    displayName: 'StubbedContextHandler',
    childContextTypes: contextTypes,
    getChildContext() {
      return context;
    },
    getWrappedElement() {
      return this.wrappedElement;
    },
    getWrappedParentElement() {
      return this.wrappedParentElement;
    },
    render() {
      this.wrappedElement = <BaseComponent {...this.state} {...this.props} />;
      this.wrappedParentElement = <StubbedContextParent>{this.wrappedElement}</StubbedContextParent>;

      return this.wrappedParentElement;
    },
  });

  BaseComponent.contextTypes = Object.assign({}, BaseComponent.contextTypes, contextTypes);

  StubbedContextHandler.getWrappedComponent = function() {
    return BaseComponent;
  };
  StubbedContextHandler.getWrappedParentComponent = function() {
    return StubbedContextParent;
  };

  return StubbedContextHandler;
}

module.exports = stubContext;
