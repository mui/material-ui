let React = require('react');
let { Paper, Styles } = require('material-ui');
let CodeBlock = require('../../code-example/code-block');

let { Spacing, Typography } = Styles;


class Prerequisites extends React.Component {

  getStyles() {
    return {
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack
      },
      codeExample: {
        backgroundColor: this.context.muiTheme.palette.canvasColor,
        marginBottom: '32px'
      }
    };
  }

  render() {

    let styles = this.getStyles();

    return (
      <div>

          <h2 style={styles.headline}>Prerequisites</h2>
          <p>
            We strongly recommend that you start with the <a href="http://facebook.github.io/react/">React Library</a> before diving into
            material-ui for a better understanding.
          </p>

      </div>
    );
  }

}

Prerequisites.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Prerequisites;
