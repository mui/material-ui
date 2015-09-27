const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class FileFileDownload extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </SvgIcon>
    );
  }
}

module.exports = FileFileDownload;
