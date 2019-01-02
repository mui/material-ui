import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem/ListItem';
import { unstable_Box as Box } from '@material-ui/core/Box';
import atoms from '../atoms';

const useStyles = makeStyles({
  root: {
    padding: '1rem 10px',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

const { Avatar, IconButton, Icon, Typography } = atoms;

function Tweet() {
  const classes = useStyles();

  return (
    <ListItem button className={classes.root}>
      <Box mb="5px">
        <Grid container spacing={8}>
          <Grid item>
            <Box
              display="flex"
              height="100%"
              justifyContent="flex-end"
              alignItems="center"
              minWidth={49}
            >
              <Icon light text>
                cached
              </Icon>
            </Box>
          </Grid>
          <Grid item>
            <Typography light>You Retweeted</Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={8} wrap="nowrap">
        <Grid item>
          <Avatar
            medium
            src={
              'https://pbs.twimg.com/profile_images/906557353549598720/oapgW_Fp_reasonably_small.jpg'
            }
          />
        </Grid>
        <Grid item>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography bold inline>
                Dan Abramov
              </Typography>{' '}
              <Typography light inline>
                @dan_abramov
              </Typography>{' '}
              <Typography light inline>
                ·
              </Typography>{' '}
              <Typography light inline>
                Dec 17
              </Typography>
              <Typography>
                In a way CSS is like Redux. You can learn the rules quickly. That may mislead you
                into thinking. Trade same
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box ml="-12px" display="inline-flex" alignItems="center">
                <IconButton>
                  <Icon light text>
                    mode_comment
                  </Icon>
                </IconButton>
                <Typography light inline>
                  24
                </Typography>
              </Box>
              <Box ml="32px" display="inline-flex" alignItems="center">
                <IconButton success>
                  <Icon light text>
                    cached
                  </Icon>
                </IconButton>
                <Typography light inline success>
                  122
                </Typography>
              </Box>
              <Box ml="32px" display="inline-flex" alignItems="center">
                <IconButton danger>
                  <Icon light text>
                    favorite_border
                  </Icon>
                </IconButton>
                <Typography light inline danger>
                  661
                </Typography>
              </Box>
              <Box ml="32px" display="inline-flex" alignItems="center">
                <IconButton>
                  <Icon light text>
                    email
                  </Icon>
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Tweet;
