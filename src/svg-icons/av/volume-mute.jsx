const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvVolumeMute extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvVolumeMute;
