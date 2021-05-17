import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

function ColorDemo(props) {
  const { data } = props;
  const theme = useTheme();
  const primary = theme.palette.augmentColor({
    color: {
      main: data.primary,
      output:
        data.primaryShade === 4
          ? `${data.primaryHue}`
          : `{
      main: '${data.primary}',
    }`,
    },
  });
  const secondary = theme.palette.augmentColor({
    color: {
      main: data.secondary,
      output:
        data.secondaryShade === 11
          ? `${data.secondaryHue}`
          : `{
      main: '${data.secondary}',
    }`,
    },
  });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', height: 390, bgcolor: 'background.paper' }}>
        <Box
          sx={{ width: '100%', height: 24 }}
          style={{ backgroundColor: primary.dark }}
        />
        <AppBar position="static" style={{ backgroundColor: primary.main }}>
          <Toolbar style={{ color: primary.contrastText }}>
            <IconButton
              edge="start"
              sx={{ mr: '20px' }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography component="div" variant="h6" color="inherit">
              Color
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="pre" sx={{ m: 2, fontSize: 16 }}>
          {`{
  palette: {
    primary: ${primary.output},
    secondary: ${secondary.output},
  },
}`}
        </Box>
        <Fab
          sx={{
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
          }}
          style={{ backgroundColor: secondary.main }}
          aria-label="add"
        >
          <AddIcon htmlColor={secondary.contrastText} />
        </Fab>
      </Box>
    </Box>
  );
}

ColorDemo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ColorDemo;
