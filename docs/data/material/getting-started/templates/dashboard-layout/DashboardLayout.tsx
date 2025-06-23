import * as React from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { createBrowserRouter, RouterProvider } from 'react-router';
import DashboardLayoutHeader from './DashboardLayout/DashboardHeader';
import DashboardLayoutSidebar from './DashboardLayout/DashboardSidebar';
import PageContainer from './components/PageContainer';
import EmployeeList from './Crud/EmployeeList';
import EmployeeShow from './Crud/EmployeeShow';
import EmployeeCreate from './Crud/EmployeeCreate';
import EmployeeEdit from './Crud/EmployeeEdit';

function HomePage() {
  const theme = useTheme();

  const [isDesktopNavigationExpanded, setIsDesktopNavigationExpanded] =
    React.useState(true);
  const [isMobileNavigationExpanded, setIsMobileNavigationExpanded] =
    React.useState(false);

  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const isNavigationExpanded = isOverMdViewport
    ? isDesktopNavigationExpanded
    : isMobileNavigationExpanded;

  const setIsNavigationExpanded = React.useCallback(
    (newExpanded: boolean) => {
      if (isOverMdViewport) {
        setIsDesktopNavigationExpanded(newExpanded);
      } else {
        setIsMobileNavigationExpanded(newExpanded);
      }
    },
    [
      isOverMdViewport,
      setIsDesktopNavigationExpanded,
      setIsMobileNavigationExpanded,
    ],
  );

  const handleToggleHeaderMenu = React.useCallback(
    (isExpanded: boolean) => {
      setIsNavigationExpanded(isExpanded);
    },
    [setIsNavigationExpanded],
  );

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
      }}
    >
      <DashboardLayoutHeader
        menuOpen={isNavigationExpanded}
        onToggleMenu={handleToggleHeaderMenu}
      />
      <DashboardLayoutSidebar
        expanded={isNavigationExpanded}
        setExpanded={setIsNavigationExpanded}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: 'none' }} />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
          }}
        >
          <PageContainer
            title="Dashboard"
            breadcrumbs={[{ title: 'Home', path: '/' }]}
            actions={<div>Toolbar actions go here</div>}
          >
            Dashboard content goes here
          </PageContainer>
        </Box>
      </Box>
    </Box>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/employees',
    element: <EmployeeList />,
  },
  {
    path: '/employees/:employeeId',
    element: <EmployeeShow />,
  },
  {
    path: '/employees/new',
    element: <EmployeeCreate />,
  },
  {
    path: '/employees/:employeeId/edit',
    element: <EmployeeEdit />,
  },
]);

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: { dark: true },
});

export default function DashboardLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
