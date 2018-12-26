import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import customs from '../../components/customs';
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';
import Header from '../../components/instagram/Header';
import theme from '../../theme/instagram/instagramTheme';
import withTheme from './withTheme';

const { Block } = customs;
const { Avatar, Icon, Typography } = atoms;
const { Tabs, Tab } = molecules;

class ProfilePage extends React.Component {
  state = {
    tabIndex: 0,
  };

  render() {
    const { tabIndex } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Block width={'100vw'} minHeight={'100vh'} backgroundColor={'#fafafa'}>
          <Header />
          <Block maxWidth={935} m={'auto'} p={'60px 20px 0'}>
            <Block mb={44}>
              <Grid container>
                <Grid item style={{ flexGrow: 1 }}>
                  <Avatar
                    style={{ margin: 'auto' }}
                    ultraLarge
                    src={
                      'https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg'
                    }
                  />
                </Grid>
                <Grid item style={{ flexGrow: 2 }}>
                  <Block mb={20} display={'flex'} alignItems={'center'}>
                    <Typography component={'h1'} variant={'h4'} inline lightWeight>
                      siriwatknp
                    </Typography>
                    <Block ml={20}>
                      <Button variant={'outlined'}>Edit Profile</Button>
                    </Block>
                    <Block ml={5}>
                      <IconButton>
                        <Icon>settings</Icon>
                      </IconButton>
                    </Block>
                  </Block>
                  <Block mb={20}>
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
                  </Block>
                  <Typography variant={'subtitle1'} bold>
                    Siriwat Kunaporn
                  </Typography>
                  <Typography variant={'subtitle1'}>Bangkok Christian College</Typography>
                  <Typography variant={'subtitle1'}>CU intania 96.</Typography>
                </Grid>
              </Grid>
            </Block>
            <Tabs
              value={tabIndex}
              centered
              onChange={(e, value) => this.setState({ tabIndex: value })}
            >
              <Tab label="Posts" disableRipple icon={<Icon>grid_on_outlined</Icon>} />
              <Tab label="IGTV" disableRipple icon={<Icon>live_tv</Icon>} />
              <Tab label="Saved" disableRipple icon={<Icon>bookmark_border_outlined</Icon>} />
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
          </Block>
        </Block>
      </React.Fragment>
    );
  }
}

export default withTheme(theme)(ProfilePage);
