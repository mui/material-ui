import React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import createGenerateClassName from '@material-ui/core/styles/createGenerateClassName';
import jssPreset from '@material-ui/core/styles/jssPreset';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridOnOutlined from '@material-ui/icons/GridOnOutlined';
import BookmarkBorderOutlined from '@material-ui/icons/BookmarkBorderOutlined';
import Settings from '@material-ui/icons/Settings';

import Header from './components/Header';

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});

const theme = createMuiTheme();

const white = {
  text: '#ffffff',
  primary: 'rgba(255, 255, 255, 0.7)',
  secondary: 'rgba(255, 255, 255, 0.54)',
  disabled: 'rgba(255, 255, 255, 0.38)',
  hint: 'rgba(255, 255, 255, 0.24)',
};

const red = {
  main: '#ff5252',
  dark: '#e04848',
};

const primary = {
  main: '#3897f0',
};

// const drawer = {
//   header: '#232f3e',
// };

const linked = {
  cursor: 'pointer',
  color: primary.main,
  display: 'inline-block',
};

const linkInverted = {
  ...linked,
  color: white.primary,
  '&:hover': {
    color: theme.palette.common.white,
  },
};

const muiTheme = {
  palette: {
    primary,
  },
  typography: {
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  },
  shape: {
    borderRadius: theme.spacing.unit / 2,
  },
  overrides: {
    MuiTabs: {
      root: {
        '& .MuiTab-selected .MuiTab-wrapper *': {
          color: '#262626',
        },
        '& > .MuiTabs-flexContainer': {
          borderTop: '1px solid #efefef',
        },
      },
      indicator: {
        height: 1,
        transform: 'translateY(-52px)',
        backgroundColor: '#262626',
      },
    },
    MuiTab: {
      root: {
        minWidth: 0,
        '&:not(:last-child)': {
          marginRight: 60,
        },
        [theme.breakpoints.up('md')]: {
          minWidth: 0,
        },
      },
      labelIcon: {
        minHeight: 53,
        '& .MuiTab-wrapper': {
          flexDirection: 'row',
        },
        '& .MuiTab-labelContainer': {
          marginLeft: 6,
        },
        '& .MuiSvgIcon-root': {
          fontSize: 16,
        },
      },
      wrapper: {
        '& *': {
          color: '#999999',
        },
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
      label: {
        textTransform: 'uppercase',
      },
    },
    MuiOutlinedInput: {
      root: {
        '& svg': {
          fontSize: 16,
          color: '#999999',
        },
        '& .MuiNotchedOutline-focused': {
          border: `2px solid ${primary.main}`,
        },
        backgroundColor: '#fafafa',
        borderRadius: 3,
      },
      notchedOutline: {
        border: '1px solid #dbdbdb',
      },
      input: {
        padding: '5px 10px 5px 0',
        fontSize: 14,
        lineHeight: '18px',
      },
    },
    MuiAppBar: {
      root: {
        height: 77,
        borderBottom: '1px solid rgba(0,0,0,0.0975)',
        alignItems: 'center',
        '& .image__instagram-label': {
          maxWidth: 103,
          marginTop: 4,
        },
        '& .MuiToolbar-root': {
          padding: '26px 20px',
          maxWidth: 1010,
          width: '100%',
        },
        '& .grid__item--left': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .grid__item--right': {
          display: 'flex',
          justifyContent: 'flex-end',
        },
        '& svg': {
          fontSize: 24,
          '&:not(:first-child)': {
            marginLeft: 30,
          },
        },
        '& .divider--vertical': {
          height: 28,
          transform: 'scaleX(0.5)',
          backgroundColor: '#262626',
          width: 1,
          margin: '0 16px',
          display: 'inline-block',
        },
      },
      colorDefault: {
        backgroundColor: white.text,
      },
    },
    MuiAvatar: {
      // size: 34px, 44px, 50px, 152px,
      root: {
        width: 44,
        height: 44,
        backgroundColor: '#fafafa',
        '&:after': {
          border: '1px solid rgba(0,0,0,0.0975)',
          borderRadius: '50%',
          bottom: 0,
          content: '" "',
          left: 0,
          pointerEvents: 'none',
          position: 'absolute',
          right: 0,
          top: 0,
        },
        '&.avatar--link': {
          cursor: 'pointer',
        },
        '&.avatar--small': {
          width: 34,
          height: 34,
        },
        '&.avatar--medium': {
          width: 50,
          height: 50,
        },
        '&.avatar--ultra-large': {
          width: 152,
          height: 152,
        },
      },
    },
    MuiList: {
      root: {
        backgroundColor: white.text,
      },
    },
    MuiListItem: {
      root: {
        '& .MuiTypography-root.list__item-text--primary': {
          fontSize: 14,
          fontWeight: 600,
          color: theme.palette.text.primary,
          textDecoration: 'none',
        },
        '& .list__item-text--secondary': {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#999',
        },
        '& .list__item-text--tertiary': {
          fontSize: 12,
          fontWeight: 400,
          color: '#999',
        },
      },
    },
    MuiButton: {
      root: {
        padding: '5px 9px',
        border: '1px solid transparent',
        minHeight: 30,
        '&.inverted': {
          borderColor: white.secondary,
          color: white.text,
        },
        '&.inverted:hover': {
          borderColor: white.primary,
          background: white.hint,
        },
      },
      label: {
        textTransform: 'none',
        fontWeight: 600,
        lineHeight: '18px',
        '& svg': {
          fontSize: 20,
        },
        '& .icon--left': {
          marginRight: theme.spacing.unit,
        },
        '& .icon--right': {
          marginLeft: theme.spacing.unit,
        },
      },
      outlined: {
        borderColor: '#dbdbdb',
        '&$disabled.inverted': {
          borderColor: white.text,
          color: white.text,
        },
      },
      contained: {
        borderColor: primary.main,
        boxShadow: theme.shadows[0],
        '&$focusVisible': {
          boxShadow: theme.shadows[0],
        },
        '&:active': {
          boxShadow: theme.shadows[0],
        },
        '&$disabled': {
          boxShadow: theme.shadows[0],
        },
        '&.danger': {
          color: white.text,
          background: red.main,
        },
        '&.danger:hover': {
          background: red.dark,
        },
      },
      containedPrimary: {
        color: theme.palette.common.white,
        '&:hover': {
          backgroundColor: primary.main,
        },
        '&:active': {
          opacity: 0.6,
        },
      },
      fab: {
        boxShadow: theme.shadows[2],
        '&:active': {
          boxShadow: theme.shadows[4],
        },
      },
    },
    MuiTypography: {
      root: {
        '&.text--link': {
          ...linked,
          textDecoration: 'underline',
        },
        '&.text--inline': {
          display: 'inline-block',
        },
        '&.text--indented': {
          marginLeft: theme.spacing.unit,
        },
        '&.text--indented-lg': {
          marginLeft: theme.spacing.unit * 3,
        },
        '&.text--bold': {
          fontWeight: 600,
        },
        '&.text--inverted': {
          color: theme.palette.common.white,
        },
        '&.text--link-inverted': linkInverted,
        '&.text--light': {
          opacity: 0.6,
        },
        '&.text--icon': {
          display: 'flex',
          alignItems: 'flex-end',
          '& .MuiSvgIcon-root': {
            marginRight: theme.spacing.unit / 2,
          },
        },
        '&.text--icon.text--inline': {
          display: 'inline-flex',
        },
        '&.text--link-hovered:hover': {
          cursor: 'pointer',
          color: primary.main,
        },
        '&.text--light-weight': {
          fontWeight: 200,
        },
      },
      subtitle1: {
        lineHeight: '24px',
      },
    },
  },
};

const Profile = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <MuiThemeProvider theme={createMuiTheme(muiTheme)}>
      <React.Fragment>
        <Header />
        <div
          style={{
            maxWidth: 935,
            margin: 'auto',
            padding: '60px 20px 0',
          }}
        >
          <div style={{ marginBottom: 44 }}>
            <Grid container>
              <Grid item style={{ flexGrow: 1 }}>
                <Avatar
                  style={{ margin: 'auto' }}
                  className={'avatar--ultra-large'}
                  src={
                    'https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg'
                  }
                />
              </Grid>
              <Grid item style={{ flexGrow: 2 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Typography
                    component={'h1'}
                    variant={'h4'}
                    className={'text--inline text--light-weight'}
                  >
                    siriwatknp
                  </Typography>
                  <Button style={{ marginLeft: 20 }} variant={'outlined'}>
                    Edit Profile
                  </Button>
                  <IconButton style={{ marginLeft: 5 }}>
                    <Settings />
                  </IconButton>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <Grid container spacing={40}>
                    <Grid item>
                      <Typography variant={'subtitle1'} className={'text--inline text--bold'}>
                        132
                      </Typography>{' '}
                      <Typography variant={'subtitle1'} className={'text--inline'}>
                        posts
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant={'subtitle1'} className={'text--inline text--bold'}>
                        325
                      </Typography>{' '}
                      <Typography variant={'subtitle1'} className={'text--inline'}>
                        followers
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant={'subtitle1'} className={'text--inline text--bold'}>
                        260
                      </Typography>{' '}
                      <Typography variant={'subtitle1'} className={'text--inline'}>
                        following
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
                <Typography variant={'subtitle1'} className={'text--bold'}>
                  Siriwat Kunaporn
                </Typography>
                <Typography variant={'subtitle1'}>Bangkok Christian College</Typography>
                <Typography variant={'subtitle1'}>CU intania 96.</Typography>
              </Grid>
            </Grid>
          </div>
          <Tabs value={0} centered>
            <Tab label="Posts" disableRipple icon={<GridOnOutlined />} />
            <Tab label="Saved" disableRipple icon={<BookmarkBorderOutlined />} />
            <Tab label="Tagged" disableRipple />
          </Tabs>
          <Grid container spacing={32}>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
            <Grid item xs={4}>
              <img alt={'post'} style={{ width: '100%' }} src={'https://via.placeholder.com/500/f5f5f5'} />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    </MuiThemeProvider>
  </JssProvider>
);

Profile.propTypes = {};
Profile.defaultProps = {};

export default Profile;
