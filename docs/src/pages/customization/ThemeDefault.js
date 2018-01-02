import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from 'material-ui/styles';
import Inspector from 'react-inspector';

const styles = theme => ({
  root: {
    padding: 8 * 2,
    backgroundColor: theme.palette.type === 'light' ? '#fff' : 'rgb(36, 36, 36)',
    minHeight: 8 * 40,
    width: '100%',
  },
});

function ThemeDefault(props) {
  const { classes, theme } = props;

  // Expose the theme as a global variable so people can play with it.
  if (process.browser) {
    window.theme = theme;
  }

  return (
    <div className={classes.root}>
      <Inspector
        theme={theme.palette.type === 'light' ? 'chromeLight' : 'chromeDark'}
        data={theme}
        expandLevel={1}
      />
    </div>
  );
}

ThemeDefault.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(withTheme()(ThemeDefault));
