import * as React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import { Link, Route, Routes, MemoryRouter, useLocation } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/drafts">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <ListItemButton component={Link} to={to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function Content() {
  const location = useLocation();
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', pb: 2 }}>
      Current route: {location.pathname}
    </Typography>
  );
}

export default function ListRouter() {
  return (
    <Router>
      <Box sx={{ width: 360 }}>
        <Routes>
          <Route path="*" element={<Content />} />
        </Routes>

        <Paper elevation={0}>
          <List aria-label="main mailbox folders">
            <ListItem disablePadding>
              <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
            </ListItem>
          </List>
          <Divider />
          <List aria-label="secondary mailbox folders">
            <ListItem disablePadding>
              <ListItemLink to="/trash" primary="Trash" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemLink to="/spam" primary="Spam" />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Router>
  );
}
