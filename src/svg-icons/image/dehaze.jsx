const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ImageDehaze extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"/>
      </SvgIcon>
    );
  }
}

module.exports = ImageDehaze;
