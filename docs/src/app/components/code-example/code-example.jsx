var React = require('react'),
  mui = require('mui'),
  Paper = mui.Paper,
  CodeBlock = require('./code-block.jsx');

class CodeExample extends React.Component {

  render() {
    return (
      <mui.Paper className="code-example">
        <div className="example-label">example</div>
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

module.exports = CodeExample;
