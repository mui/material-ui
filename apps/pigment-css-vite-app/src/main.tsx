import * as ReactDOMClient from 'react-dom/client';
import * as React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import routes from '~react-pages';
import '@pigment-css/react/styles.css';

function App() {
  return <React.Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</React.Suspense>;
}

const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

const root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
);
