let React = require('react');
let SvgIcon = {{{ muiRequireStmt }}};

let {{className}} = React.createClass({

  render() {
    return (
      <SvgIcon {...this.props}>
        {{{paths}}}
      </SvgIcon>
    );
  }

});

module.exports = {{className}};
