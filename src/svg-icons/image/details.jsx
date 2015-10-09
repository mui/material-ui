const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ImageDetails extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z"/>
      </SvgIcon>
    );
  }
}

module.exports = ImageDetails;
