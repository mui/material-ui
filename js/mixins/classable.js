var React = require('react'),
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
      classString = props.className || '';

    	if (this.state && this.state.classes) classString += ' ' + this.state.classes;
      if (props.keyHeight) classString += ' key-height-' + props.keyHeight;
      if (props.keyWidth) classString += ' key-width-' + props.keyWidth;
      if (props.selected) classString += ' selected';

      classString.split(' ').forEach(function(className) {
        if (className) classObj[className] = true;
      });

      this.setState({
        mergedClasses: classSet(classObj)
      });

    return this;
  }

}
