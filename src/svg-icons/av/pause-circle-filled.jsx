const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvPauseCircleFilled extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvPauseCircleFilled;
