const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class CommunicationCallMissed extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z"/>
      </SvgIcon>
    );
  }
}

module.exports = CommunicationCallMissed;
