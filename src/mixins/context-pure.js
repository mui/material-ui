const shallowEqual = require('../utils/shallow-equal');

function relevantContextKeysEqual(classObject, currentContext, nextContext) {

  //Get those keys from current object's context that we care
  //about and check whether those keys have changed or not
  if (classObject.getRelevantContextKeys) {
    const currentContextKeys = classObject.getRelevantContextKeys(currentContext);
    const nextContextKeys = classObject.getRelevantContextKeys(nextContext);
    if (!shallowEqual(currentContextKeys, nextContextKeys)) {
      return false;
    }
  }

  //Check if children context keys changed
  if (classObject.getChildrenClasses) {
    const childrenArray = classObject.getChildrenClasses();
    for (let i = 0; i < childrenArray.length; i++) {
      if (!relevantContextKeysEqual(childrenArray[i], currentContext, nextContext)) {
        return false;
      }
    }
  }

  //context keys are equal
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
      (!staticTheme && !relevantContextKeysEqual(this.constructor, this.context, nextContext))
    );
  },

};
