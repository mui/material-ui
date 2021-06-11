import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { MemoryRouter, Route, Link, useRouteMatch } from 'react-router-dom';

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const routeMatch = useRouteMatch(['/inbox/:id', '/drafts', '/trash']);
  const currentTab = routeMatch?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Inbox" value="/inbox/:id" to="/inbox/1" component={Link} />
      <Tab label="Drafts" value="/drafts" to="/drafts" component={Link} />
      <Tab label="Trash" value="/trash" to="/trash" component={Link} />
    </Tabs>
  );
}

export default function TabsRouter() {
  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      <Box sx={{ width: '100%' }}>
        <Route>
          {({ location }) => (
            <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
              Current route: {location.pathname}
            </Typography>
          )}
        </Route>
        <MyTabs />
      </Box>
    </MemoryRouter>
  );
}
