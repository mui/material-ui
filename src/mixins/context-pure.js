const shallowEqual = require('../utils/shallow-equal');

function contextPropsEqual(classObject, currentContext, nextContext) {

  //Check if current object's context props changed
  if (classObject.getContextProps) {
    const currentContextProps = classObject.getContextProps(currentContext);
    const nextContextProps = classObject.getContextProps(nextContext);
    if (!shallowEqual(currentContextProps, nextContextProps)) {
      return false;
    }
  }

  //Check if children context props changed
  if (classObject.getChildrenClasses) {
    const childrenArray = classObject.getChildrenClasses();
    for (let i = 0; i < childrenArray.length; i++) {
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
  shouldComponentUpdate(nextProps, nextState, nextContext) {

    const staticTheme = (
      this.context.muiTheme &&
      this.context.muiTheme.static
    );

    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      (!staticTheme && !contextPropsEqual(this.constructor, this.context, nextContext))
    );
  },

};
