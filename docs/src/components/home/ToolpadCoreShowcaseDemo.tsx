import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer, type Navigation } from '@toolpad/core';
import DemoSandbox from 'docs/src/modules/components/DemoSandbox';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
];

interface DemoProps {
  window?: () => Window;
}

const NOOP = () => {};

const PlaceHolder = styled('div')<{ height: number }>(({ theme, height }) => ({
  border: `1px solid ${theme.palette.divider}`,
  height,
  borderRadius: theme.shape.borderRadius,
}));

function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider navigation={NAVIGATION} router={router} window={demoWindow}>
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={2}>
            <Grid size={6}>
              <PlaceHolder height={100} />
            </Grid>
            <Grid size={6}>
              <PlaceHolder height={100} />
            </Grid>
            <Grid size={12}>
              <PlaceHolder height={100} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

export default function ToolpadDashboardLayout() {
  return (
    <DemoSandbox iframe name="DashboardLayout" onResetDemoClick={NOOP} usesCssVarsTheme>
      <DashboardLayoutBasic />
    </DemoSandbox>
  );
}
