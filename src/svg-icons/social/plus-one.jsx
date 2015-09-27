const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class SocialPlusOne extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 8H8v4H4v2h4v4h2v-4h4v-2h-4zm4.5-1.92V7.9l2.5-.5V18h2V5z"/>
      </SvgIcon>
    );
  }
}

module.exports = SocialPlusOne;
