import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

const ListItemLink = ({ icon, primary, secondary, to }) => (
  <li>
    <ListItem button component={props => <Link to={to} {...props} />}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText inset primary={primary} secondary={secondary} />
    </ListItem>
  </li>
);

export default function CompositionRerenderInline() {
  return (
    <MemoryRouter initialEntries={['/', '/inbox', '/drafts']}>
      <div>
        <div>
          <List component="nav">
            <ListItemLink primary="Inbox" icon={<InboxIcon />} to="/inbox" />
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
          </List>
        </div>
        <Route
          children={({ location }) => (
            <Route
              children={({ location }) => (
                <Typography type="title">Current route: {location.pathname}</Typography>
              )}
            />
          )}
        />
      </div>
    </MemoryRouter>
  );
}
