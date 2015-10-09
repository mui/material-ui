const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorFormatQuote extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorFormatQuote;
