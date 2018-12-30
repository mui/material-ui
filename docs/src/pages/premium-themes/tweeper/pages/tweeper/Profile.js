import Proptypes from 'prop-types';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
import Header from '../../components/tweeper/Header';
import Tweet from '../../components/tweeper/Tweet';
import TrackWho from '../../components/tweeper/TrackWho';
import PopularNow from '../../components/tweeper/PopularNow';
import AccordingWhom from '../../components/tweeper/AccordingWhom';
import theme from '../../theme/tweeper/tweeperTheme';
import withTheme from './withTheme';
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';

const { Avatar, Icon, Typography } = atoms;
const { Tabs, Tab } = molecules;

const Container = styled('div')({
  width: '100vw',
  minHeight: '100vh',
  backgroundColor: 'rgb(230, 236, 240)',
});

const Content = styled('div')({
  maxWidth: 1000,
  padding: '0 10px',
  margin: '10px auto',
});

const Feed = styled('div')({
  background: '#ffffff',
});

const Panel = styled('div')({
  width: 360,
  marginLeft: 20,
});

const Cover = styled('div')({
  height: 200,
  backgroundColor: 'rgb(204, 214, 221)',
});

class Profile extends React.Component {
  state = {};

  render() {
    return (
      <Container>
        <CssBaseline />
        <Header />
        <Content>
          <Grid container>
            <Grid item xs>
              <Feed>
                <Cover />
                <div style={{ padding: 10, marginBottom: 5 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      textAlign: 'right',
                    }}
                  >
                    <Avatar
                      style={{ marginTop: '-18%', marginBottom: 14 }}
                      ultraLarge
                      bordered
                      src={
                        'https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg'
                      }
                    />
                    <Button large color={'primary'} variant={'outlined'} disableRipple>
                      Edit Profile
                    </Button>
                  </div>
                  <Typography primary>siriwatknp</Typography>
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
                </div>
                <Tabs underline value={0} fullWidth>
                  <Tab label="Tweet" disableRipple />
                  <Tab label="Tweets and Responses" disableRipple />
                  <Tab label="Media" disableRipple />
                  <Tab label="liking" disableRipple />
                </Tabs>
                <Divider />
                <Tweet />
              </Feed>
              <Box mt={'10px'}>
                <AccordingWhom />
              </Box>
            </Grid>
            <Grid item>
              <Panel>
                <Box mb={'10px'}>
                  <TrackWho />
                </Box>
                <PopularNow />
              </Panel>
            </Grid>
          </Grid>
        </Content>
      </Container>
    );
  }
}

Profile.propTypes = {
  classes: Proptypes.shape({}).isRequired,
};

export default withTheme(theme)(Profile);
