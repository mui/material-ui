var React = require('react'),
  mui = require('mui'),
  Paper = mui.Paper,
  CodeBlock = require('./code-block.jsx');

class CodeExample extends React.Component {

  render() {
    var style = {
      color: this.context.theme.palette.textColor
    };

    return (
      <mui.Paper className="code-example">
        <div className="example-label" style={style}>example</div>
        <div className="example-block">
          {this.props.children}
        </div>
        <CodeBlock>{this.props.code}</CodeBlock>
      </mui.Paper>
    );
  }
}

CodeExample.propTypes = {
  code: React.PropTypes.string.isRequired
};

CodeExample.contextTypes = {
  theme: React.PropTypes.object
}

module.exports = CodeExample;
