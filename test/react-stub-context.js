// "react-stub-context": "^0.3.0",

var React = require('react');

function stubContext(BaseComponent, context) {
  if(typeof context === 'undefined' || context === null) context = {};

  var _contextTypes = {}, _context = context;

  try {
    Object.keys(_context).forEach(function(key) {
      _contextTypes[key] = React.PropTypes.any;
    });
  } catch (err) {
    throw new TypeError('createdStubbedContextComponent requires an object');
  }

  var StubbedContextParent = React.createClass({
    displayName: 'StubbedContextParent',
    childContextTypes: _contextTypes,
    getChildContext() { return _context; },
    contextTypes: _contextTypes,

    render() {
      return React.Children.only(this.props.children);
    }
  });

  var StubbedContextHandler = React.createClass({
    displayName: 'StubbedContextHandler',
    childContextTypes: _contextTypes,
    getChildContext() { return _context; },

    getWrappedElement() { return this._wrappedElement; },
    getWrappedParentElement() { return this._wrappedParentElement; },

    render() {
      this._wrappedElement = <BaseComponent {...this.state} {...this.props} />;
      this._wrappedParentElement = <StubbedContextParent>{this._wrappedElement}</StubbedContextParent>;

      return this._wrappedParentElement;
    }
  });

  BaseComponent.contextTypes = Object.assign({}, BaseComponent.contextTypes, _contextTypes);

  StubbedContextHandler.getWrappedComponent = function() { return BaseComponent; }
  StubbedContextHandler.getWrappedParentComponent = function() { return StubbedContextParent; }

  return StubbedContextHandler;
}

module.exports = stubContext;
