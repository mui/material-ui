import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

const styles = theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    height: 390,
    backgroundColor: theme.palette.background.paper,
  },
  statusBar: {
    width: '100%',
    height: 24,
  },
  menuButton: {
    marginRight: 20,
  },
  code: {
    marginTop: theme.spacing(1),
    '& pre': {
      margin: '0px !important',
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

function ColorDemo(props) {
  const { classes, data, theme } = props;
  const primary = theme.palette.augmentColor({
    main: data.primary,
    output:
      data.primaryShade === 4
        ? `${data.primaryHue}`
        : `{
      main: '${data.primary}',
    }`,
  });
  const secondary = theme.palette.augmentColor({
    main: data.secondary,
    output:
      data.secondaryShade === 11
        ? `${data.secondaryHue}`
        : `{
      main: '${data.secondary}',
    }`,
  });

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <div className={classes.statusBar} style={{ backgroundColor: primary.dark }} />
        <AppBar position="static" style={{ backgroundColor: primary.main }}>
          <Toolbar style={{ color: primary.contrastText }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Color sample
            </Typography>
          </Toolbar>
        </AppBar>
        <MarkdownElement
          dir="ltr"
          className={classes.code}
          text={`\`\`\`jsx
{
  palette: {
    primary: ${primary.output},
    secondary: ${secondary.output},
  },
}
\`\`\``}
        />
        <Fab className={classes.fab} style={{ backgroundColor: secondary.main }} aria-label="Add">
          <AddIcon htmlColor={secondary.contrastText} />
        </Fab>
      </div>
    </div>
  );
}

ColorDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ColorDemo);
