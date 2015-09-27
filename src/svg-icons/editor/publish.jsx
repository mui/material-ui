const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorPublish extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorPublish;
