var React = require('react'),
  Constants = require('../utils/constants.js'),
  classSet = require('../utils/class-set.js');

module.exports = {

  propTypes: {
    className: React.PropTypes.string
  },

  componentWillMount: function() {
    this.mergeClass(this.props);
  },

  componentWillReceiveProps: function(newProps) {
    this.mergeClass(newProps);
  },

  mergeClass: function(props) {
    var classObj = {},
      classString = '';

    	if (this.state && this.state.classes) classString += ' ' + this.state.classes;
      if (props.className) classString += ' ' + props.className;
      if (props.keyHeight) classString += ' mui-key-height-' + props.keyHeight;
      if (props.keyWidth) classString += ' mui-key-width-' + props.keyWidth;
      if (props.selected) classString += ' mui-selected';

      classString.split(' ').forEach(function(className) {
        if (className) classObj[className] = true;
      });

      this.setState({
        mergedClasses: classSet(classObj)
      });

    return this;
  }

}
