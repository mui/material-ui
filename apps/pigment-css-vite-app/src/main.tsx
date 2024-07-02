import * as ReactDOMClient from 'react-dom/client';
import * as React from 'react';
import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { css } from '@mui/material-pigment-css';
import { ErrorBoundary } from 'react-error-boundary';
import routes from '~react-pages';
import '@mui/material-pigment-css/styles.css';
import { ErrorBoundaryFallback } from './components/ErrorBoundaryFallback';

function App() {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname} FallbackComponent={ErrorBoundaryFallback}>
      <React.Suspense
        fallback={
          <div
            className={css`
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <CircularProgress size={100} variant="indeterminate" />
          </div>
        }
      >
        {useRoutes(routes)}
      </React.Suspense>
    </ErrorBoundary>
  );
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
