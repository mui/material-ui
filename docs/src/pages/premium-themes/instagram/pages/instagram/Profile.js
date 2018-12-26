import React from 'react';
import Proptypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';
import Header from '../../components/instagram/Header';
import theme from '../../theme/instagram/instagramTheme';
import withTheme from './withTheme';

const { Avatar, Icon, Typography } = atoms;
const { Tabs, Tab } = molecules;

const styles = () => ({
  container: {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#fafafa',
  },
  content: {
    maxWidth: 935,
    margin: 'auto',
    padding: '60px 20px 0',
  },
  profile: {
    marginBottom: 44,
  },
  wrapper: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
  editButton: {
    marginLeft: 20,
  },
  settings: {
    marginLeft: 5,
  },
  stat: {
    marginBottom: 20,
  },
});

class ProfilePage extends React.Component {
  state = {
    tabIndex: 0,
  };

  render() {
    const { tabIndex } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.container}>
          <Header />
          <div className={classes.content}>
            <div className={classes.profile}>
              <Grid container>
                <Grid item style={{ flexGrow: 1 }}>
                  <Avatar
                    ultraLarge
                    style={{ margin: 'auto' }}
                    src={
                      'https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg'
                    }
                  />
                </Grid>
                <Grid item style={{ flexGrow: 2 }}>
                  <div className={classes.wrapper}>
                    <Typography
                      component={'h1'}
                      variant={'h4'}
                      inline
                      lightWeight
                    >
                      siriwatknp
                    </Typography>
                    <div className={classes.editButton}>
                      <Button variant={'outlined'}>Edit Profile</Button>
                    </div>
                    <div className={classes.settings}>
                      <IconButton>
                        <Icon>settings</Icon>
                      </IconButton>
                    </div>
                  </div>
                  <div className={classes.stat}>
                    <Grid container spacing={40}>
                      <Grid item>
                        <Typography variant={'subtitle1'} inline>
                          <b>132</b> posts
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={'subtitle1'} inline>
                          <b>325</b> followers
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant={'subtitle1'} inline>
                          <b>260</b> following
                        </Typography>{' '}
                      </Grid>
                    </Grid>
                  </div>
                  <Typography variant={'subtitle1'} bold>
                    Siriwat Kunaporn
                  </Typography>
                  <Typography variant={'subtitle1'}>
                    Bangkok Christian College
                  </Typography>
                  <Typography variant={'subtitle1'}>CU intania 96.</Typography>
                </Grid>
              </Grid>
            </div>
            <Tabs
              value={tabIndex}
              centered
              onChange={(e, value) => this.setState({ tabIndex: value })}
            >
              <Tab
                label="Posts"
                disableRipple
                icon={<Icon>grid_on_outlined</Icon>}
              />
              <Tab label="IGTV" disableRipple icon={<Icon>live_tv</Icon>} />
              <Tab
                label="Saved"
                disableRipple
                icon={<Icon>bookmark_border_outlined</Icon>}
              />
              <Tab label="Tagged" disableRipple />
            </Tabs>
            <Grid container spacing={32}>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
              <Grid item xs={4}>
                <img
                  alt={'post'}
                  style={{ width: '100%' }}
                  src={'https://via.placeholder.com/500/f5f5f5'}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ProfilePage.propTypes = {
  classes: Proptypes.shape({}).isRequired,
};

export default withTheme(theme)(withStyles(styles)(ProfilePage));
