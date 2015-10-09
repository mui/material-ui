const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ImageExposureNeg1 extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M4 11v2h8v-2H4zm15 7h-2V7.38L14 8.4V6.7L18.7 5h.3v13z"/>
      </SvgIcon>
    );
  }
}

module.exports = ImageExposureNeg1;
