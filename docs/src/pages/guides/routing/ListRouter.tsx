import * as React from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(function Link(
        itemProps,
        ref,
      ) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function ListRouter() {
  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      <Box sx={{ width: 360 }}>
        <Route>
          {({ location }) => (
            <Typography variant="body2" sx={{ pb: 2 }} color="text.secondary">
              Current route: {location.pathname}
            </Typography>
          )}
        </Route>
        <Paper elevation={0}>
          <List aria-label="main mailbox folders">
            <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} />
            <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
          </List>
          <Divider />
          <List aria-label="secondary mailbox folders">
            <ListItemLink to="/trash" primary="Trash" />
            <ListItemLink to="/spam" primary="Spam" />
          </List>
        </Paper>
      </Box>
    </MemoryRouter>
  );
}
