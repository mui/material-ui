import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
};

function typographyV1Theme(theme) {
  return createMuiTheme({
    ...theme,
    typography: {
      suppressDeprecationWarnings: true,
      useNextVariants: false,
    },
  });
}

function DeprecatedTypes(props) {
  const { classes } = props;

  return (
    <MuiThemeProvider theme={typographyV1Theme}>
      <div className={classes.root}>
        <Typography variant="display4" gutterBottom>
          Display 4
        </Typography>
        <Typography variant="display3" gutterBottom>
          Display 3
        </Typography>
        <Typography variant="display2" gutterBottom>
          Display 2
        </Typography>
        <Typography variant="display1" gutterBottom>
          Display 1
        </Typography>
        <Typography variant="headline" gutterBottom>
          Headline
        </Typography>
        <Typography variant="title" gutterBottom>
          Title
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Subheading
        </Typography>
        <Typography variant="body2" gutterBottom>
          Body 2
        </Typography>
        <Typography variant="body1" gutterBottom align="right">
          Body 1
        </Typography>
        <Typography variant="caption" gutterBottom align="center">
          Caption
        </Typography>
        <Typography gutterBottom noWrap>
          {`
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        `}
        </Typography>
        <Typography variant="button" gutterBottom>
          Button
        </Typography>
      </div>
    </MuiThemeProvider>
  );
}

DeprecatedTypes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeprecatedTypes);
