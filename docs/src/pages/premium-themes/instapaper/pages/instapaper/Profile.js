import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import atoms from '../../components/atoms';
import molecules from '../../components/molecules';
import Header from '../../components/instapaper/Header';
import theme from '../../theme/instapaper/theme';
import withTheme from './withTheme';
import Box from '@material-ui/core/Box';

const { Avatar, Icon, Typography } = atoms;
const { Tabs, Tab } = molecules;

const useStyles = makeStyles({
  editButton: {
    marginLeft: 0,
    marginTop: 12,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20,
      marginTop: 0,
    },
  },
  settings: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 5,
    },
  },
});

function ProfilePage() {
  const [tabIndex, setTabIndex] = React.useState(0);
  const classes = useStyles();
  const upSm = useMediaQuery(theme.breakpoints.up('sm'), { defaultMatches: true });

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Box component="main" maxWidth={935} margin="auto" padding="60px 20px 0">
        <Box mb="44px">
          <Grid container>
            <Grid item xs={4}>
              <Avatar
                ultraLarge={upSm}
                medium={!upSm}
                style={{ margin: 'auto' }}
                alt="My profile"
                src="https://cc-media-foxit.fichub.com/image/fox-it-mondofox/e8c0f288-781d-4d0b-98ad-fd169782b53b/scene-sottacqua-per-i-sequel-di-avatar-maxw-654.jpg"
              />
            </Grid>
            <Grid item xs={8}>
              <Box clone mb="20px">
                <Grid container alignItems="center">
                  <Typography component="h1" variant="h4" lightWeight>
                    siriwatknp
                  </Typography>
                  <Button className={classes.editButton} variant="outlined" fullWidth={!upSm}>
                    Edit Profile
                  </Button>
                  <div className={classes.settings}>
                    <IconButton>
                      <Icon>settings</Icon>
                    </IconButton>
                  </div>
                </Grid>
              </Box>
              <Box mb="20px">
                <Grid container spacing={5}>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>132</b> posts
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>325</b> followers
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      <b>260</b> following
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Typography variant="subtitle1" bold>
                Siriwat Kunaporn
              </Typography>
              <Typography variant="subtitle1">Bangkok Christian College</Typography>
              <Typography variant="subtitle1">CU intania 96.</Typography>
            </Grid>
          </Grid>
        </Box>
        <Tabs
          value={tabIndex}
          centered
          onChange={(event, value) => {
            setTabIndex(value);
          }}
        >
          <Tab label="Posts" icon={<Icon>grid_on_outlined</Icon>} />
          <Tab label="IGTV" icon={<Icon>live_tv</Icon>} />
          <Tab label="Saved" icon={<Icon>bookmark_border_outlined</Icon>} />
          <Tab label="Tagged" />
        </Tabs>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
          <Grid item xs={4}>
            <img
              alt="post"
              style={{ width: '100%' }}
              src="https://via.placeholder.com/500/f5f5f5"
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default withTheme(theme)(ProfilePage);
