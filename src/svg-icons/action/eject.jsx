const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ActionEject extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"/>
      </SvgIcon>
    );
  }
}

module.exports = ActionEject;
