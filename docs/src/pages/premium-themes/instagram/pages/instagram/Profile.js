import React from 'react';
import styled from 'react-emotion';

import Avatar from '@material-ui/core/Avatar/Avatar';
import Button from '@material-ui/core/Button/Button';
import Grid from '@material-ui/core/Grid/Grid';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import CssBaseline from '@material-ui/core/CssBaseline';

import atoms from '../../components/atoms';

import Header from '../../components/instagram/Header';
import theme from '../../theme/instagram/instagramTheme';
import withTheme from './withTheme';

const { Icon, Typography } = atoms;

const Container = styled('div')({
  width: '100vw',
  minHeight: '100vh',
  backgroundColor: '#fafafa',
});

const Content = styled('div')({
  maxWidth: 935,
  margin: 'auto',
  padding: '60px 20px 0',
});

const Flex = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ProfilePage = () => (
  <React.Fragment>
    <CssBaseline />
    <Container>
      <Header />
      <Content>
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
              <Flex style={{ marginBottom: 20 }}>
                <Typography component={'h1'} variant={'h4'} inline lightWeight>
                  siriwatknp
                </Typography>
                <Button style={{ marginLeft: 20 }} variant={'outlined'}>
                  Edit Profile
                </Button>
                <IconButton style={{ marginLeft: 5 }}>
                  <Icon>settings</Icon>
                </IconButton>
              </Flex>
              <div style={{ marginBottom: 20 }}>
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
        <Tabs value={0} centered>
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
      </Content>
    </Container>
  </React.Fragment>
);

export default withTheme(theme)(ProfilePage);
