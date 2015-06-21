let React = require('react');
let { ClearFix, Paper, Styles } = require('mui');
let CodeBlock = require('./code-block.jsx');

let { Colors, Spacing, Typography } = Styles;


class CodeExample extends React.Component {

  getStyles() {
    let borderColor = this.context.muiTheme.palette.borderColor;
    let canvasColor = this.context.muiTheme.palette.canvasColor;
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
    let styles = this.getStyles();
    return (
      <Paper style={styles.root}>
          <div style={styles.exampleLabel}>example</div>
          <ClearFix style={styles.exampleBlock}>
            {this.props.children}
          </ClearFix>
          <CodeBlock>{this.props.code}</CodeBlock>
      </Paper>
    );
  }
}

CodeExample.propTypes = {
  code: React.PropTypes.string.isRequired
};

CodeExample.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = CodeExample;
