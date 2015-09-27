const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvEqualizer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvEqualizer;
