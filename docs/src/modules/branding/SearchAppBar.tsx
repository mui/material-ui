import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import BrandingLogo from 'docs/src/modules/branding/BrandingLogo';
import t1 from 'docs/src/modules/branding/t1';

const AppBarWrapper = styled('div')<{}>(({ theme }) => ({
  flexGrow: 1,
  '& .MuiAppBar-linksWrapper': {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
    flexGrow: 1,
    marginLeft: 50,
    '& > *': {
      marginRight: theme.spacing(4),
      marginTop: 4,
    },
  },
  '& .MuiSearchAppBar-logo': {
    flexGrow: 1,
    paddingTop: theme.spacing(0.5),
    [theme.breakpoints.up('lg')]: {
      flexGrow: 0,
    },
  },
  '& .MuiSearcAppBar-menuButton': {
    display: 'block',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  '& [class*="MuiToolbar-root"]': {
    [theme.breakpoints.up('lg')]: {
      height: 80,
    },
  },
}));

const DrawerList = ({
  toggleDrawer,
}: {
  toggleDrawer: (isOpen: boolean) => (event: React.SyntheticEvent) => void;
}) => (
  <div
    style={{ width: '200px' }}
    role="presentation"
    onClick={toggleDrawer(false)}
    onKeyDown={toggleDrawer(false)}
  >
    <List>
      <ListItem component="a">
        <ListItemText primary={t1('Docs')} />
      </ListItem>
      <ListItem component="a">
        <ListItemText primary={t1('Material-UI X')} />
      </ListItem>
      <ListItem component="a">
        <ListItemText primary={t1('Pricing')} />
      </ListItem>
      <ListItem component="a">
        <ListItemText primary={t1('Templates')} />
      </ListItem>
      <ListItem component="a">
        <ListItemText primary={t1('About Us')} />
      </ListItem>
    </List>
  </div>
);

const AppSearch = React.lazy(() => import('docs/src/modules/branding/AppSearch'));

function DeferredAppSearch() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <React.Fragment>
      {/* Suspense isn't supported for SSR yet */}
      {mounted ? (
        <React.Suspense fallback={null}>
          <AppSearch />
        </React.Suspense>
      ) : null}
    </React.Fragment>
  );
}

export default function SearchAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (inOpen: boolean) => (event: React.SyntheticEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <AppBarWrapper>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <div className="MuiSearchAppBar-logo">
            <BrandingLogo href="/" />
          </div>
          <div className="MuiAppBar-linksWrapper">
            {/* TODO: Make links and update them to correct page */}
            <Typography noWrap component="span">
              {t1('Docs')}
            </Typography>
            <Typography noWrap component="span">
              {t1('Material-UI X')}
            </Typography>
            <Typography noWrap component="span">
              {t1('Pricing')}
            </Typography>
            <Typography noWrap component="span">
              {t1('Templates')}
            </Typography>
            <Typography noWrap component="span">
              {t1('About Us')}
            </Typography>
          </div>
          <DeferredAppSearch />
          <IconButton
            className="MuiSearcAppBar-menuButton"
            edge="start"
            color="inherit"
            aria-label={t1('menu')}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </AppBarWrapper>
  );
}
