let React = require('react');
let BeforeAfterWrapper = require('./before-after-wrapper');


let ClearFix = React.createClass({

  render() {
    let {
      style,
      ...other,
    } = this.props;

    let before = function() {
      return {
        content: "' '",
        display: 'table',
      };
    };

    let after = before();
    after.clear = 'both';

    return (
      <BeforeAfterWrapper
        {...other}
        beforeStyle={before()}
        afterStyle={after}
        style={this.props.style}>
          {this.props.children}
      </BeforeAfterWrapper>
    );
  },
});

module.exports = ClearFix;
