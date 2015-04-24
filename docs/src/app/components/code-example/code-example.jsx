var React = require('react'),
  mui = require('mui'),
  Paper = mui.Paper,
  CodeBlock = require('./code-block.jsx');

class CodeExample extends React.Component {

  render() {
    var borderColor = this.context.theme.palette.borderColor;
    var style = {
      label: {
        color: borderColor
      },
      block: {
        borderRight: 'solid 1px ' + borderColor,
        borderBottom: 'solid 1px ' + borderColor,
        borderRadius: '0 0 2px 0'
      }
    };

    return (
      <mui.Paper className="code-example">
        <div className="example-label" style={style.label}>example</div>
        <div className="example-block" style={style.block}>
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
