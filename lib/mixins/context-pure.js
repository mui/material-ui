'use strict';

var shallowEqual = require('../utils/shallow-equal');

function contextPropsEqual(classObject, currentContext, nextContext) {

  //Check if current object's context props changed
  if (classObject.getContextProps) {
    var currentContextProps = classObject.getContextProps(currentContext);
    var nextContextProps = classObject.getContextProps(nextContext);
    if (!shallowEqual(currentContextProps, nextContextProps)) {
      return false;
    }
  }

  //Check if children context props changed
  if (classObject.getChildrenClasses) {
    var childrenArray = classObject.getChildrenClasses();
    for (var i = 0; i < childrenArray.length; i++) {
      if (!contextPropsEqual(childrenArray[i], currentContext, nextContext)) {
        return false;
      }
    }
  }

  //Props are equal
  return true;
}

module.exports = {

  //Don't update if state, prop, and context are equal
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState, nextContext) {

    var staticTheme = this.context.muiTheme && this.context.muiTheme['static'];

    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !staticTheme && !contextPropsEqual(this.constructor, this.context, nextContext);
  }

};