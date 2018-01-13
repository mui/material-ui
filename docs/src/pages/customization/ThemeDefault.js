import React from 'react';
import PropTypes from 'prop-types';
import Inspector from 'react-inspector';
import { withStyles, withTheme, createMuiTheme } from 'material-ui/styles';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const styles = theme => ({
  root: {
    padding: 8 * 2,
    backgroundColor: theme.palette.type === 'light' ? '#fff' : 'rgb(36, 36, 36)',
    minHeight: 8 * 40,
    width: '100%',
  },
});

class ThemeDefault extends React.Component {
  state = {
    checked: false,
  };

  render() {
    const { classes, theme: docsTheme } = this.props;
    const { checked } = this.state;

    const theme = createMuiTheme({
      palette: {
        type: docsTheme.palette.type,
      },
      direction: docsTheme.direction,
    });

    // Expose the theme as a global variable so people can play with it.
    if (process.browser) {
      window.theme = theme;
    }

    return (
      <div className={classes.root}>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={(event, value) => this.setState({ checked: value })}
            />
          }
          label="Expand all"
        />
        <Inspector
          theme={theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark'}
          data={theme}
          expandLevel={checked ? 100 : 1}
          key={`${checked}-${theme.palette.type}`} // Remount
        />
      </div>
    );
  }
}

ThemeDefault.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTheme()(ThemeDefault));
