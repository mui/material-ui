const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ImageExposurePlus1 extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 7H8v4H4v2h4v4h2v-4h4v-2h-4V7zm10 11h-2V7.38L15 8.4V6.7L19.7 5h.3v13z"/>
      </SvgIcon>
    );
  }
}

module.exports = ImageExposurePlus1;
