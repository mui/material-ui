let React = require('react');
let { SvgIcon } = require('mui');


class ContentSend extends React.Component {

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
      </SvgIcon>
    );
  }

}

module.exports = ContentSend;
