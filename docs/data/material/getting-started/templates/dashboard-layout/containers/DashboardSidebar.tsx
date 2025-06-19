import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import type {} from '@mui/material/themeCssVarsAugmentation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { matchPath, useLocation } from 'react-router';
import { DashboardSidebarContext } from '../context';
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from '../constants';
import DashboardSidebarPageItem from '../components/DashboardSidebar/DashboardSidebarPageItem';
import DashboardSidebarHeaderItem from '../components/DashboardSidebar/DashboardSidebarHeaderItem';
import DashboardSidebarDividerItem from '../components/DashboardSidebar/DashboardSidebarDividerItem';
import {
  getDrawerSxTransitionMixin,
  getDrawerWidthTransitionMixin,
} from '../mixins';

export interface DashboardSidebarProps {
  expanded?: boolean;
  setExpanded: (expanded: boolean) => void;
  disableCollapsibleSidebar?: boolean;
}

export default function DashboardSidebar({
  expanded = true,
  setExpanded,
  disableCollapsibleSidebar = false,
}: DashboardSidebarProps) {
  const theme = useTheme();

  const { pathname } = useLocation();

  const [expandedItemIds, setExpandedItemIds] = React.useState<string[]>([]);

  const isOverSmViewport = useMediaQuery(theme.breakpoints.up('sm'));
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up('md'));

  const [isFullyExpanded, setIsFullyExpanded] = React.useState(expanded);
  const [isFullyCollapsed, setIsFullyCollapsed] = React.useState(!expanded);

  React.useEffect(() => {
    if (expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyExpanded(true);
      }, theme.transitions.duration.enteringScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyExpanded(false);

    return () => {};
  }, [expanded, theme.transitions.duration.enteringScreen]);

  React.useEffect(() => {
    if (!expanded) {
      const drawerWidthTransitionTimeout = setTimeout(() => {
        setIsFullyCollapsed(true);
      }, theme.transitions.duration.leavingScreen);

      return () => clearTimeout(drawerWidthTransitionTimeout);
    }

    setIsFullyCollapsed(false);

    return () => {};
  }, [expanded, theme.transitions.duration.leavingScreen]);

  const mini = !disableCollapsibleSidebar && !expanded;

  const handleSetSidebarExpanded = React.useCallback(
    (newExpanded: boolean) => () => {
      setExpanded(newExpanded);
    },
    [setExpanded],
  );

  const handlePageItemClick = React.useCallback(
    (itemId: string, hasNestedNavigation: boolean) => {
      if (hasNestedNavigation && !mini) {
        setExpandedItemIds((previousValue) =>
          previousValue.includes(itemId)
            ? previousValue.filter(
                (previousValueItemId) => previousValueItemId !== itemId,
              )
            : [...previousValue, itemId],
        );
      } else if (!hasNestedNavigation) {
        setExpanded(false);
      }
    },
    [mini, setExpanded],
  );

  const hasDrawerTransitions =
    isOverSmViewport && (!disableCollapsibleSidebar || isOverMdViewport);

  const getDrawerContent = React.useCallback(
    (viewport: 'phone' | 'tablet' | 'desktop') => (
      <React.Fragment>
        <Toolbar />
        <Box
          component="nav"
          aria-label={`${viewport.charAt(0).toUpperCase()}${viewport.slice(1)}`}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'auto',
            scrollbarGutter: mini ? 'stable' : 'auto',
            overflowX: 'hidden',
            pt: !mini ? 0 : 2,
            ...(hasDrawerTransitions
              ? getDrawerSxTransitionMixin(isFullyExpanded, 'padding')
              : {}),
          }}
        >
          <DashboardSidebarContext.Provider
            value={{
              onPageItemClick: handlePageItemClick,
              mini,
              fullyExpanded: isFullyExpanded,
              fullyCollapsed: isFullyCollapsed,
              hasDrawerTransitions,
            }}
          >
            <List
              sx={{
                padding: 0,
                mb: 4,
                width: mini ? MINI_DRAWER_WIDTH : 'auto',
              }}
            >
              <DashboardSidebarHeaderItem>Main items</DashboardSidebarHeaderItem>
              <DashboardSidebarPageItem
                id="dashboard"
                title="Dashboard"
                icon={<DashboardIcon />}
                href="/"
                selected={!!matchPath('/', pathname)}
              />
              <DashboardSidebarPageItem
                id="orders"
                title="Orders"
                icon={<ShoppingCartIcon />}
                href="/orders"
                selected={!!matchPath('/orders', pathname)}
              />
              <DashboardSidebarDividerItem />
              <DashboardSidebarHeaderItem>Analytics</DashboardSidebarHeaderItem>
              <DashboardSidebarPageItem
                id="reports"
                title="Reports"
                icon={<BarChartIcon />}
                href="/reports"
                selected={!!matchPath('/reports', pathname)}
                defaultExpanded={!!matchPath('/reports', pathname)}
                expanded={expandedItemIds.includes('reports')}
                nestedNavigation={
                  <List
                    sx={{
                      padding: 0,
                      my: 0.5,
                      minWidth: 240,
                    }}
                  >
                    <DashboardSidebarPageItem
                      id="sales"
                      title="Sales"
                      icon={<DescriptionIcon />}
                      href="/reports/sales"
                      selected={!!matchPath('/reports/sales', pathname)}
                    />
                    <DashboardSidebarPageItem
                      id="traffic"
                      title="Traffic"
                      icon={<DescriptionIcon />}
                      href="/reports/traffic"
                      selected={!!matchPath('/reports/traffic', pathname)}
                    />
                  </List>
                }
              />
              <DashboardSidebarPageItem
                id="integrations"
                title="Integrations"
                icon={<LayersIcon />}
                href="/integrations"
                selected={!!matchPath('/integrations', pathname)}
              />
            </List>
          </DashboardSidebarContext.Provider>
        </Box>
      </React.Fragment>
    ),
    [
      mini,
      hasDrawerTransitions,
      isFullyExpanded,
      isFullyCollapsed,
      handlePageItemClick,
      expandedItemIds,
      pathname,
    ],
  );

  const getDrawerSharedSx = React.useCallback(
    (isTemporary: boolean) => {
      const drawerWidth = mini ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

      return {
        displayPrint: 'none',
        width: drawerWidth,
        flexShrink: 0,
        ...getDrawerWidthTransitionMixin(expanded),
        ...(isTemporary ? { position: 'absolute' } : {}),
        [`& .MuiDrawer-paper`]: {
          position: 'absolute',
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundImage: 'none',
          ...getDrawerWidthTransitionMixin(expanded),
        },
      };
    },
    [expanded, mini],
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={expanded}
        onClose={handleSetSidebarExpanded(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: 'block',
            sm: disableCollapsibleSidebar ? 'block' : 'none',
            md: 'none',
          },
          ...getDrawerSharedSx(true),
        }}
      >
        {getDrawerContent('phone')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            sm: disableCollapsibleSidebar ? 'none' : 'block',
            md: 'none',
          },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('tablet')}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          ...getDrawerSharedSx(false),
        }}
      >
        {getDrawerContent('desktop')}
      </Drawer>
    </>
  );
}
