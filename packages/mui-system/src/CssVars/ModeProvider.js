import * as React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@mui/material/useMediaQuery';

const ModeContext = React.createContext();

export const useModeToggle = () => {
  const context = React.useContext(ModeContext);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
  let mode = context.mode;
  if (!mode) {
    if (prefersLightMode) {
      mode = 'light';
    }
    if (prefersDarkMode) {
      mode = 'dark';
    }
  }
  return {
    ...context,
    mode,
    setMode: (nextMode) => {
      context.setMode(nextMode);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('mui-mode', nextMode);
      }
    },
  };
};

const ModeProvider = ({
  children,
  attribute = 'data-theme',
  initialMode: initialModeProp,
  defaultTheme = 'light',
}) => {
  let initialMode = initialModeProp;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  if (prefersDarkMode) {
    initialMode = 'dark';
  }
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');
  if (prefersLightMode) {
    initialMode = 'light';
  }
  if (typeof localStorage !== 'undefined') {
    const storageMode = localStorage.getItem('mui-mode');
    if (storageMode) {
      initialMode = storageMode;
    }
  }
  const [mode, setMode] = React.useState(initialMode);
  React.useEffect(() => {
    if (mode) {
      document.body.setAttribute(attribute, mode);
    }
  }, [mode, attribute]);
  return (
    <ModeContext.Provider value={{ defaultTheme, mode, setMode }}>{children}</ModeContext.Provider>
  );
};

ModeProvider.propTypes = {
  attribute: PropTypes.string,
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  defaultTheme: PropTypes.string,
  initialMode: PropTypes.string,
};

export default ModeProvider;
