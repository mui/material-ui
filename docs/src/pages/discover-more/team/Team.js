import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Github from '@material-ui/docs/svgIcons/GitHub';
import Twitter from '@material-ui/docs/svgIcons/Twitter';

const members = [
  {
    name: 'Hai Nguyen',
    github: 'hai-cea',
    twitter: 'haicea',
    flag: 'v0.x creator',
    city: 'Dallas, Texas, US',
  },
  {
    name: 'Olivier Tassinari',
    github: 'oliviertassinari',
    twitter: 'olivtassinari',
    flag: 'v1.x co-creator',
    city: 'Paris, France',
  },
  {
    name: 'Matt Brookes',
    github: 'mbrookes',
    twitter: 'randomtechdude',
    flag: 'Documentation wizard 📖',
    city: 'London, UK',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    flag: 'Core focus',
    city: 'Franklin, Tennessee, US',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    flag: 'v1.x co-creator',
    city: 'Toronto, ON',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    flag: 'Community partner, TypeScript',
    city: 'Freiburg, Germany',
  },
  {
    name: 'Maik Marschner',
    github: 'leMaik',
    twitter: 'leMaikOfficial',
    flag: 'Community partner',
    city: 'Hannover, Germany',
  },
  {
    name: 'Oleg Slobodskoi',
    github: 'kof',
    twitter: 'oleg008',
    flag: 'Community partner, JSS',
    city: 'Berlin, Germany',
  },
  {
    name: 'Ken Gregory',
    github: 'kgregory',
    flag: 'Community partner',
    city: 'New Jersey, US',
  },
  {
    name: 'Tom Crockett',
    github: 'pelotom',
    twitter: 'pelotom',
    flag: 'Community partner',
    city: 'Los Angeles, California, US',
  },
];

const styles = theme => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    margin: `${theme.spacing.unit}px 0`,
  },
  cover: {
    width: theme.spacing.unit * 10,
    height: theme.spacing.unit * 10,
    margin: theme.spacing.unit * 2,
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: theme.palette.background.default,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 18,
    width: 22,
    height: 22,
  },
});

function Team(props) {
  const { classes } = props;
  return (
    <Grid container spacing={16}>
      {members.map(member => (
        <Grid key={member.name} item xs={12} md={6}>
          <Paper>
            <Grid container>
              <Grid item>
                <CardMedia
                  className={classes.cover}
                  image={`https://github.com/${member.github}.png`}
                  title="Picture"
                />
              </Grid>
              <Grid item>
                <div className={classes.details}>
                  <Typography variant="headline">{member.name}</Typography>
                  <Typography variant="subheading" color="textSecondary">
                    {member.flag}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.city}
                  </Typography>
                  <div className={classes.controls}>
                    {member.github && (
                      <IconButton
                        aria-label="GitHub"
                        component="a"
                        href={`https://github.com/${member.github}`}
                        className={classes.icon}
                      >
                        <Github />
                      </IconButton>
                    )}
                    {member.twitter && (
                      <IconButton
                        aria-label="Twitter"
                        component="a"
                        href={`https://twitter.com/${member.twitter}`}
                        className={classes.icon}
                      >
                        <Twitter />
                      </IconButton>
                    )}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

Team.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Team);
