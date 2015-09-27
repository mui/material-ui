const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorBorderAll extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorBorderAll;
