import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
    borderRadius: '4px',
  },
}));

function Demo({ darkState, palletType, handleThemeChange }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div style={{ textTransform: 'capitalize' }}> {palletType} theme </div>
      <IconButton onClick={handleThemeChange} color="inherit" size="medium">
        {darkState ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
}

Demo.propTypes = {
  darkState: PropTypes.bool.isRequired,
  handleThemeChange: PropTypes.func.isRequired,
  palletType: PropTypes.string.isRequired,
};

export default function SwitchTheme() {
  const [darkState, setDarkState] = React.useState(true);
  const palletType = darkState ? 'dark' : 'light';
  const theme = createMuiTheme({
    palette: {
      mode: palletType,
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <div style={{ width: '100%' }}>
      <ThemeProvider theme={theme}>
        <Demo
          handleThemeChange={handleThemeChange}
          darkState={darkState}
          palletType={palletType}
        />
      </ThemeProvider>
    </div>
  );
}
