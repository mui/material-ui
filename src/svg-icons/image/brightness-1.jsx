const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ImageBrightness1 extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <circle cx="12" cy="12" r="10"/>
      </SvgIcon>
    );
  }
}

module.exports = ImageBrightness1;
