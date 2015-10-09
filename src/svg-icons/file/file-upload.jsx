const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class FileFileUpload extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
      </SvgIcon>
    );
  }
}

module.exports = FileFileUpload;
