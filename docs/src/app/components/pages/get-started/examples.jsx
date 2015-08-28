let React = require('react');
let { Paper, Styles } = require('material-ui');

let { Spacing, Typography } = Styles;


class Examples extends React.Component {

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
    };
  }

  render() {

    let styles = this.getStyles();

    return (
      <div>
        
        <h2 style={styles.headline}>Examples</h2>
        <p>
          There are 2 projects that you can look at to get started. They can be found
          in the <a href="https://github.com/callemall/material-ui/tree/master/examples">examples folder</a>. The
          first project is a basic example that shows how to consume material-ui components in your own project.
          This project uses <a href="http://browserify.org/">browserify</a> for module bundling 
          and <a href="http://gulpjs.com/">gulp</a> for JS task automation.
        </p>
        <p>
          The second project is this documentation site. This is a slightly more complex project that 
          uses <a href="http://webpack.github.io">webpack</a> for module bundling and building, and contains
          examples of every material-ui component. Check out the <a href="https://github.com/callemall/material-ui/tree/master/docs">docs folder</a> for
          build instructions.
        </p>

    </div>
    );
  }

}

Examples.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Examples;
