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
    } = this.props;

    let palette = this.context.muiTheme.palette;
    let borderColor = palette.borderColor;
    let canvasColor = palette.canvasColor;

    let styles = {
      root: {
        backgroundColor: canvasColor,
        marginBottom: 32,
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
      }
    };

    return (
      <Paper style={styles.root}>
        <div style={styles.exampleLabel}>example</div>
        <ClearFix style={styles.exampleBlock}>{children}</ClearFix>
        <CodeBlock>{code}</CodeBlock>
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
