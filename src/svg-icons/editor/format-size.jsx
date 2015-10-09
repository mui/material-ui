const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorFormatSize extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorFormatSize;
