let React = require('react');
let classNames = require('classnames');


module.exports = {

  propTypes: {
    className: React.PropTypes.string,
  },

  getDefaultProps(){
    return {
      className: '',
    };
  },

  getClasses(initialClasses, additionalClassObj) {
    let classString = '';

    //Initialize the classString with the classNames that were passed in
    if (this.props.className.length) classString += ' ' + this.props.className;

    //Add in initial classes
    if (typeof initialClasses === 'object') {
      classString += ' ' + classNames(initialClasses);
    }
    else {
      classString += ' ' + initialClasses;
    }

    //Add in additional classes
    if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

    //Convert the class string into an object and run it through the class set
    return classNames(this.getClassSet(classString));
  },

  getClassSet(classString) {
    let classObj = {};

    if (classString) {
      classString.split(' ').forEach((className) => {
        if (className) classObj[className] = true;
      });
    }

    return classObj;
  },

};
