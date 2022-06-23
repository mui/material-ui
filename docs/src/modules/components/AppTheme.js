import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'docs/src/modules/components/Head';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Fab
      color="primary"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      sx={{ position: 'fixed', bottom: '1.5rem', right: '1rem' }}
    >
      {mode === 'light' ? <LightMode /> : <DarkMode />}
    </Fab>
  );
};

export default function AppTheme(props) {
  const { children } = props;

  return (
    <React.Fragment>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <CssVarsProvider>
        <CssBaseline />
        {children}
        <ModeToggle />
      </CssVarsProvider>
    </React.Fragment>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node.isRequired,
};
