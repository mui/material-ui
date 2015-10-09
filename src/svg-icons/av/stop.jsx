const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvStop extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 6h12v12H6z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvStop;
