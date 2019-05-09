/* eslint-disable no-nested-ternary */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link, { LinkProps } from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { Omit } from '@material-ui/types';

interface RouterBreadcrumbsState {
  readonly open: boolean;
}

interface ListItemLinkProps extends LinkProps {
  to: string;
  open?: boolean;
}

interface RouterBreadcrumbsProp extends WithStyles<typeof styles> {}

const breadcrumbNameMap: { [key: string]: string } = {
  '/inbox': 'Inbox',
  '/inbox/important': 'Important',
  '/trash': 'Trash',
  '/spam': 'Spam',
  '/drafts': 'Drafts',
};

function ListItemLink(props: Omit<ListItemLinkProps, 'ref'>) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      width: 360,
    },
    lists: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(1),
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  });

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => <Link {...props} component={RouterLink as any} />;

class RouterBreadcrumbs extends React.Component<RouterBreadcrumbsProp, RouterBreadcrumbsState> {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;

    return (
      <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
        <div className={classes.root}>
          <Route>
            {({ location }) => {
              const pathnames = location.pathname.split('/').filter(x => x);

              return (
                <Breadcrumbs aria-label="Breadcrumb">
                  <LinkRouter color="inherit" to="/">
                    Home
                  </LinkRouter>
                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                      <Typography color="textPrimary" key={to}>
                        {breadcrumbNameMap[to]}
                      </Typography>
                    ) : (
                      <LinkRouter color="inherit" to={to} key={to}>
                        {breadcrumbNameMap[to]}
                      </LinkRouter>
                    );
                  })}
                </Breadcrumbs>
              );
            }}
          </Route>
          <div className={classes.lists}>
            <List component="nav">
              <ListItemLink to="/inbox" open={this.state.open} onClick={this.handleClick} />
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemLink to="/inbox/important" className={classes.nested} />
                </List>
              </Collapse>
              <ListItemLink to="/trash" />
              <ListItemLink to="/spam" />
            </List>
          </div>
        </div>
      </MemoryRouter>
    );
  }
}

(RouterBreadcrumbs as React.ComponentClass<
  RouterBreadcrumbsProp,
  RouterBreadcrumbsState
>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(RouterBreadcrumbs);
