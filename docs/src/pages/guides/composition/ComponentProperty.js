/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
  },
});

class ListItemLink extends React.Component {
  renderLink = React.forwardRef((itemProps, ref) => (
    // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
    <RouterLink to={this.props.to} {...itemProps} innerRef={ref} />
  ));

  render() {
    const { icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
}

ListItemLink.propTypes = {
  icon: PropTypes.node.isRequired,
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

// polyfill required for react-router-dom < 5.0.0
const Link = React.forwardRef((props, ref) => <RouterLink {...props} innerRef={ref} />);

function ListItemLinkShorthand(props) {
  const { primary, to } = props;
  return (
    <li>
      <ListItem button component={Link} to={to}>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLinkShorthand.propTypes = {
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

function ComponentProperty(props) {
  const { classes } = props;

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      <div className={classes.root}>
        <Route>
          {({ location }) => (
            <Typography gutterBottom>Current route: {location.pathname}</Typography>
          )}
        </Route>
        <div className={classes.lists}>
          <List component="nav">
            <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} />
            <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
          </List>
          <Divider />
          <List component="nav">
            <ListItemLinkShorthand to="/trash" primary="Trash" />
            <ListItemLinkShorthand to="/spam" primary="Spam" />
          </List>
        </div>
      </div>
    </MemoryRouter>
  );
}

ComponentProperty.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentProperty);
