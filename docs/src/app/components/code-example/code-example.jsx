let React = require('react');

let {
  ClearFix,
  Paper,
  Styles,
} = require('material-ui');

let {
  Spacing,
  Typography,
} = Styles;

let CodeBlock = require('./code-block');


class CodeExample extends React.Component {

  render() {

    let {
      children,
      code,
      layoutSideBySide,
    } = this.props;

    let palette = this.context.muiTheme.palette;
    let borderColor = palette.borderColor;
    let canvasColor = palette.canvasColor;

    let styles = {
      root: {
        backgroundColor: canvasColor,
        marginBottom: 32,
        overflow: 'hidden'
      },
      exampleLabel: {
        color: borderColor,
        padding: 8,
        marginBottom: 0,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium,
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: Spacing.desktopGutter,
        margin: 0,
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null,
      }
    };

    return (
      <Paper style={styles.root}>
        <ClearFix style={styles.exampleBlock}>{children}</ClearFix>
        <CodeBlock style={styles.codeBlock}>{code}</CodeBlock>
      </Paper>
    );
  }
}

CodeExample.propTypes = {
  code: React.PropTypes.string.isRequired,
  layoutSideBySide: React.PropTypes.bool,
};

CodeExample.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = CodeExample;
