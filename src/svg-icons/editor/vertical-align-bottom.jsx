const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const EditorVerticalAlignBottom = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/>
      </SvgIcon>
    );
  },
});

module.exports = EditorVerticalAlignBottom;
