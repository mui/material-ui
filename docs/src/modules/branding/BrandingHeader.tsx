import * as React from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'docs/src/modules/components/Link';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import BrandingLogo from 'docs/src/modules/branding/BrandingLogo';
import t1 from 'docs/src/modules/branding/t1';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

interface StyledAppBarProps extends AppBarProps {
  mode: 'light' | 'dark';
}

const StyledAppBar = styled(AppBar)<StyledAppBarProps>(({ theme }) => ({
  '& .BrandingHeader-linksWrapper': {
    marginLeft: theme.spacing(7),
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
    '& > *': {
      marginRight: theme.spacing(4),
      marginTop: 4,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
}));

interface BrandingMobileNavProps {
  toggleDrawer: Function;
}

const BrandingMobileNav = React.forwardRef<HTMLDivElement, BrandingMobileNavProps>(
  function BrandingMobileNav(props, ref) {
    const { toggleDrawer, ...other } = props;
    return (
      <Box
        ref={ref}
        {...other}
        sx={{
          zIndex: (theme) => theme.zIndex.appBar + 1,
          bgcolor: 'secondary.main',
          position: 'fixed',
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
      </Box>
    );
  },
);

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

interface BrandingHeaderProps {
  mode?: 'light' | 'dark';
}

export default function BrandingHeader(props: BrandingHeaderProps) {
  const { mode = 'light' } = props;
  const [open, setOpen] = React.useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

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
      <StyledAppBar
        mode={mode}
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: trigger ? (theme) => `1px solid ${theme.palette.divider}` : null,
          boxShadow: trigger ? 'rgb(0 0 0 / 5%) 0px 3px 8px' : null,
        }}
      >
        <Toolbar>
          <BrandingLogo sx={{ display: { xs: 'none', sm: 'inline-flex' } }} />
          <BrandingLogo variant="icon" sx={{ display: { xs: 'inline-flex', sm: 'none' } }} />
          <div className="BrandingHeader-linksWrapper">
            <Typography
              variant="body2"
              color="text.primary"
              underline="none"
              component={Link}
              href="/"
            >
              {t1('Docs')}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              underline="none"
              component={Link}
              href="/x/"
            >
              {t1('Material-UI X')}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              underline="none"
              component={Link}
              href="/pricing/"
            >
              {t1('Pricing')}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              underline="none"
              component={Link}
              href="/getting-started/templates/"
            >
              {t1('Templates')}
            </Typography>
            <Typography
              variant="body2"
              color="text.primary"
              underline="none"
              component={Link}
              href="/branding/about/"
            >
              {t1('About Us')}
            </Typography>
          </div>
          <Box sx={{ flex: 1 }} />
          <DeferredBrandingSearch />
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
        </Toolbar>
      </StyledAppBar>
      <Fade in={open}>
        <BrandingMobileNav toggleDrawer={toggleDrawer} />
      </Fade>
    </React.Fragment>
  );
}
