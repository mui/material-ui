Foo.propTypes = {
  bothTypes: function (props, propName) {
    if (props[propName] == null) {
      return new Error("Prop '" + propName + "' is required but wasn't specified");
    } else if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
      return new Error("Expected prop '" + propName + "' to be of type Element");
    }
  },
  element: function (props, propName) {
    if (props[propName] == null) {
      return new Error("Prop '" + propName + "' is required but wasn't specified");
    } else if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
      return new Error("Expected prop '" + propName + "' to be of type Element");
    }
  },
  htmlElement: function (props, propName) {
    if (props[propName] == null) {
      return new Error("Prop '" + propName + "' is required but wasn't specified");
    } else if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
      return new Error("Expected prop '" + propName + "' to be of type Element");
    }
  },
  optional: function (props, propName) {
    if (props[propName] == null) {
      return null;
    } else if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
      return new Error("Expected prop '" + propName + "' to be of type Element");
    }
  },
};
