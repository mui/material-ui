var React = require('react');
var classSet = require('react-classset');

module.exports = {

  propTypes: {
    className: React.PropTypes.string
  },

  getClasses: function(initialClasses, additionalClassObj) {
    var classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className) classString += ' ' + this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classSet(initialClasses);
    } else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classSet(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classSet(this.getClassSet(classString));
  },

  getClassSet: function(classString) {
    var classObj = {};

    if (classString) {
      classString.split(' ').forEach(function(className) {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  }

}
