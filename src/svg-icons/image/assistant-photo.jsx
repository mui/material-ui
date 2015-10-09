const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ImageAssistantPhoto extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
      </SvgIcon>
    );
  }
}

module.exports = ImageAssistantPhoto;
