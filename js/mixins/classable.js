var React = require('react/addons'),
  classSet = React.addons.classSet;

module.exports = {

  propTypes: {
    className: React.PropTypes.string
  },

  getClasses: function(additionalClasses) {
    var classString = '', 
      classObj = {};

    //Initialize the classString with the classNames that were passed in
    //and include all special common classes
    if (this.props.className) classString += ' ' + this.props.className;
    if (this.props.keyHeight) classString += ' mui-key-height-' + this.props.keyHeight;
    if (this.props.keyWidth) classString += ' mui-key-width-' + this.props.keyWidth;
    if (this.props.selected) classString += ' mui-selected';
    if (this.state && this.state.open) classString += ' mui-open';

    //Add in additional classes
    if (typeof additionalClasses === 'object') {
      classString += ' ' + classSet(additionalClasses);
    } else {
      classString += ' ' + additionalClasses;
    }

    classObj = this.getClassSet(classString);

    return classSet(classObj);
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
