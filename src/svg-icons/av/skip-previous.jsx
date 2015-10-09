const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvSkipPrevious extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvSkipPrevious;
