import React from 'react';
import CodeBlock from './CodeBlock';
import ClearFix from 'material-ui/lib/clearfix';
import Paper from 'material-ui/lib/paper';
import Spacing from 'material-ui/lib/styles/spacing';
import Typography from 'material-ui/lib/styles/typography';
import muiThemeable from 'material-ui/lib/muiThemeable';

let CodeExample = React.createClass({

  propTypes: {
    _muiTheme: React.PropTypes.object.isRequired,
    children: React.PropTypes.node,
    code: React.PropTypes.string.isRequired,
    layoutSideBySide: React.PropTypes.bool,
  },

  render() {
    const {
      _muiTheme,
      children,
      code,
      layoutSideBySide,
    } = this.props;

    const palette = _muiTheme.baseTheme.palette;
    const borderColor = palette.borderColor;
    const canvasColor = palette.canvasColor;

    const styles = {
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
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null,
      },
    };

    return (
      <Paper style={styles.root}>
        <ClearFix style={styles.exampleBlock}>{children}</ClearFix>
        <CodeBlock style={styles.codeBlock}>{code}</CodeBlock>
      </Paper>
    );
  },
});

CodeExample = muiThemeable(CodeExample);

export default CodeExample;
