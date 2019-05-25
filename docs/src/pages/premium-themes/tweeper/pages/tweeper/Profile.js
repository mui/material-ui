import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import Header from '../../components/tweeper/Header';
import Tweet from '../../components/tweeper/Tweet';
import TrackWho from '../../components/tweeper/TrackWho';
import PopularNow from '../../components/tweeper/PopularNow';
import AccordingWhom from '../../components/tweeper/AccordingWhom';
import theme from '../../theme/tweeper/theme';
import withTheme from './withTheme';
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';

const { Avatar, Icon, Typography, Button } = atoms;
const { Tabs, Tab } = molecules;

const Content = styled('div')({
  maxWidth: 1000,
  padding: theme.spacing(4),
  margin: 'auto',
});

const Feed = styled('div')({
  backgroundColor: '#fff',
});

const Cover = styled('div')({
  height: 200,
  backgroundColor: '#ccd6dd',
});

function Profile() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Feed>
              <Cover />
              <Box p={2} mb={1}>
                <Box
                  css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    textAlign: 'right',
                  }}
                >
                  <Avatar
                    style={{ marginTop: '-18%', marginBottom: 14 }}
                    ultraLarge
                    bordered
                    alt="My profile"
                    src={
                      'https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg'
                    }
                  />
                  <Button large color="primary" variant="outlined">
                    Edit Profile
                  </Button>
                </Box>
                <Typography component="h1" primary>
                  siriwatknp
                </Typography>
                <Typography light gutterBottom>
                  @siriwatknp
                </Typography>
                <div>
                  <Icon text light>
                    calendar_today
                  </Icon>
                  <Typography light inline indented gutterBottom>
                    Joined August 2016
                  </Typography>
                </div>
                <Typography bold inline>
                  48
                </Typography>
                <Typography light inline indented>
                  Following
                </Typography>
                <Typography bold inline indentedLarge>
                  3
                </Typography>
                <Typography light inline indented>
                  Followers
                </Typography>
              </Box>
              <Tabs value={0} variant="fullWidth">
                <Tab label="Tweet" />
                <Tab label="Tweets and Responses" />
                <Tab label="Media" />
                <Tab label="liking" />
              </Tabs>
              <Divider />
              <Tweet />
            </Feed>
            <Box mt="10px">
              <AccordingWhom />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb="10px">
              <TrackWho />
            </Box>
            <PopularNow />
          </Grid>
        </Grid>
      </Content>
    </React.Fragment>
  );
}

export default withTheme(theme)(Profile);
