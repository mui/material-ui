const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorVerticalAlignTop extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorVerticalAlignTop;
