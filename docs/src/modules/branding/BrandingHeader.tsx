import * as React from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'docs/src/modules/components/Link';
import { styled, alpha, darken } from '@material-ui/core/styles';
import BrandingLogo from 'docs/src/modules/branding/BrandingLogo';
import t1 from 'docs/src/modules/branding/t1';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const links = (
  <ul className="BrandingHeader-linksWrapper">
    <li>
      <Link variant="body2" color="inherit" underline="none" activeClassName="Mui-active" href="/">
        {t1('Docs')}
      </Link>
    </li>
    <li>
      <Link
        variant="body2"
        color="inherit"
        underline="none"
        activeClassName="Mui-active"
        href="/branding/mui-x/"
      >
        {t1('Material-UI X')}
      </Link>
    </li>
    <li>
      <Link
        variant="body2"
        color="inherit"
        underline="none"
        activeClassName="Mui-active"
        href="/branding/pricing/"
      >
        {t1('Pricing')}
      </Link>
    </li>
    <li>
      <Link
        variant="body2"
        color="inherit"
        underline="none"
        activeClassName="Mui-active"
        href="/getting-started/templates/"
      >
        {t1('Templates')}
      </Link>
    </li>
    <li>
      <Link
        variant="body2"
        color="inherit"
        underline="none"
        activeClassName="Mui-active"
        href="/branding/about/"
      >
        {t1('About Us')}
      </Link>
    </li>
  </ul>
);

const StyledBrandingMobileLinks = styled('div')(({ theme }) => ({
  overflow: 'auto',
  padding: theme.spacing(4, 3),
  [theme.breakpoints.up('sm')]: {
    paddingTop: theme.spacing(5),
  },
  '& .BrandingHeader-linksWrapper': {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  '& li': {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  },
  '& .MuiTypography-root': {
    display: 'block',
    ...theme.typography.h3,
  },
}));

interface BrandingMobileNavProps {
  open: boolean;
  toggleDrawer: Function;
}

function BrandingMobileNav(props: BrandingMobileNavProps) {
  const { open, toggleDrawer } = props;
  return (
    <Modal open={open}>
      <Fade in={open}>
        <Box
          sx={{
            zIndex: (theme) => theme.zIndex.appBar + 1,
            outline: 'none',
            bgcolor: 'secondary.main',
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            color: '#fff',
          }}
        >
          <Toolbar>
            <BrandingLogo />
            <Box sx={{ flex: 1 }} />
            <IconButton
              edge="end"
              color="inherit"
              aria-label={t1('menu')}
              onClick={toggleDrawer(false)}
              sx={{ display: { xs: 'block', lg: 'none' } }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Box
            component="img"
            src="/static/branding/block5.svg"
            alt=""
            loading="lazy"
            sx={{
              opacity: 0.8,
              width: '80vh',
              position: 'absolute',
              right: { xs: -260, md: '-20vh' },
              bottom: -130,
            }}
          />
          <StyledBrandingMobileLinks>{links}</StyledBrandingMobileLinks>
        </Box>
      </Fade>
    </Modal>
  );
}

const BrandingSearch = React.lazy(() => import('docs/src/modules/branding/BrandingSearch'));

function DeferredBrandingSearch() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <React.Fragment>
      {/* Suspense isn't supported for SSR yet */}
      {mounted ? (
        <React.Suspense fallback={null}>
          <BrandingSearch />
        </React.Suspense>
      ) : null}
    </React.Fragment>
  );
}

interface StyledAppBarProps extends AppBarProps {
  trigger: boolean;
  mode: 'light' | 'dark';
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'mode' && prop !== 'trigger',
})<StyledAppBarProps>(({ mode, trigger, theme }) => ({
  borderBottom: trigger
    ? `1px solid ${
        mode === 'light' ? theme.palette.divider : darken(theme.palette.secondary.main, 0.35)
      }`
    : undefined,
  boxShadow: trigger
    ? `${
        mode === 'light' ? 'rgb(0 0 0 / 5%)' : alpha(theme.palette.secondary.main, 0.15)
      } 0px 3px 8px`
    : undefined,
  color: mode === 'light' ? theme.palette.text.primary : theme.palette.secondary.contrastText,
  backgroundColor: mode === 'light' ? '#fff' : theme.palette.secondary.main,
  '& .BrandingHeader-linksWrapper': {
    marginLeft: theme.spacing(7),
    padding: 0,
    listStyle: 'none',
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
    '& .MuiTypography-root': {
      marginRight: theme.spacing(4),
      '&:hover': {
        color: theme.palette.primary.main,
      },
      '&.Mui-active': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  },
}));

interface BrandingHeaderProps {
  mode?: 'light' | 'dark';
}

function BrandingHeaderMobileNav() {
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
    <React.Fragment>
      <IconButton
        className="BrandingHeader-iconButton"
        edge="end"
        color="inherit"
        aria-label={t1('menu')}
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'block', lg: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <BrandingMobileNav open={open} toggleDrawer={toggleDrawer} />
    </React.Fragment>
  );
}

export default function BrandingHeader(props: BrandingHeaderProps) {
  const { mode = 'light' } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <React.Fragment>
      <StyledAppBar mode={mode} trigger={trigger} position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <BrandingLogo
            variant={mode === 'light' ? 'lockup' : 'lockup-inverted'}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          />
          <BrandingLogo variant="icon" sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
          {links}
          <Box sx={{ flex: 1 }} />
          <DeferredBrandingSearch />
          <BrandingHeaderMobileNav />
        </Toolbar>
      </StyledAppBar>
    </React.Fragment>
  );
}
