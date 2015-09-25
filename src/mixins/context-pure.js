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

    //If either the props or state have changed, component should update
    if(!shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)) {
      return true;
    }

    //If current theme and next theme are both undefined, do not update
    if(!this.context.muiTheme && !nextContext.muiTheme) {
      return false;
    }

    //If both themes exist, compare keys only if current theme is not static
    if(this.context.muiTheme && nextContext.muiTheme) {
      return !this.context.muiTheme.static &&
        !relevantContextKeysEqual(this.constructor, this.context.muiTheme, nextContext.muiTheme);
    }

    //At this point it is guaranteed that exactly one theme is undefined so simply update
    return true;
  },

};
