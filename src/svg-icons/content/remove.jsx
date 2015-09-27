const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ContentRemove extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 13H5v-2h14v2z"/>
      </SvgIcon>
    );
  }
}

module.exports = ContentRemove;
