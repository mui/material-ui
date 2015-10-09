const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvPlayArrow extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M8 5v14l11-7z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvPlayArrow;
