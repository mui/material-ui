var React = require('react');
var mui = require('mui');
var CodeBlock = require('./code-block.jsx');

var {ClearFix, Paper} = mui;
var {Colors, Spacing, Typography} = mui.Styles;

class CodeExample extends React.Component {

  getStyles() {
    var borderColor = this.context.muiTheme.palette.borderColor;
    var canvasColor = this.context.muiTheme.palette.canvasColor;
    return {
      root: {
        backgroundColor: canvasColor,
        marginBottom: '32px'
      },
      exampleLabel: {
        color: borderColor,
        padding: '8px',
        marginBottom: '0',
        //mui-font-style-menu
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0',
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: Spacing.desktopGutter,
        margin: '0'
      }
    };
  }

  render() {
    var styles = this.getStyles();
    return (
      <mui.Paper style={styles.root}>
          <div style={styles.exampleLabel}>example</div>
          <ClearFix style={styles.exampleBlock}>
            {this.props.children}
          </ClearFix>
          <CodeBlock>{this.props.code}</CodeBlock>
      </mui.Paper>
    );
  }
}

CodeExample.propTypes = {
  code: React.PropTypes.string.isRequired
};

CodeExample.contextTypes = {
  muiTheme: React.PropTypes.object
}

module.exports = CodeExample;
