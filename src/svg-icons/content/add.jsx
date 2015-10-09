const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ContentAdd extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </SvgIcon>
    );
  }
}

module.exports = ContentAdd;
