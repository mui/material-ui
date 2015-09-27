const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorFormatItalic extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorFormatItalic;
