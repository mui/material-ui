const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class EditorSpaceBar extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M18 9v4H6V9H4v6h16V9z"/>
      </SvgIcon>
    );
  }
}

module.exports = EditorSpaceBar;
