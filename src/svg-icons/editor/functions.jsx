const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorFunctions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorFunctions;
