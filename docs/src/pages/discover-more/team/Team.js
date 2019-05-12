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

const activeCore = [
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
    flag: 'Core team',
    city: 'London, UK',
  },
  {
    name: 'Sebastian Silbermann',
    github: 'eps1lon',
    twitter: 'sebsilbermann',
    flag: 'Core team',
    city: 'Dresden, Germany',
  },
  {
    name: 'Josh Wooding',
    github: 'joshwooding',
    twitter: 'JoshWooding_',
    flag: 'Core team',
    city: 'UK',
  },
  {
    name: 'Maik Marschner',
    github: 'leMaik',
    twitter: 'leMaikOfficial',
    flag: 'Core Team',
    city: 'Hannover, Germany',
  },
  {
    name: 'Tom Crockett',
    github: 'pelotom',
    twitter: 'pelotom',
    flag: 'Core Team',
    city: 'Los Angeles, California, US',
  },
];

const emeriti = [
  {
    name: 'Hai Nguyen',
    github: 'hai-cea',
    twitter: 'haicea',
    flag: 'v0.x creator',
    city: 'Dallas, Texas, US',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    flag: 'v1.x co-creator',
    city: 'Toronto, ON',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    flag: 'Core team',
    city: 'Franklin, Tennessee, US',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    flag: 'Core Team',
    city: 'Freiburg, Germany',
  },
  {
    name: 'Ken Gregory',
    github: 'kgregory',
    flag: 'Core Team',
    city: 'New Jersey, US',
  },
];

const partners = [
  {
    name: 'Oleg Slobodskoi',
    github: 'kof',
    twitter: 'oleg008',
    flag: 'JSS',
    city: 'Berlin, Germany',
  },
  {
    name: 'Dmitriy Kovalenko',
    github: 'dmtrKovalenko',
    twitter: 'dmtrKovalenko',
    flag: '@material-ui/pickers',
    city: 'Kharkiv, Ukraine',
  },
];

const styles = theme => ({
  details: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  cover: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(2),
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    fontSize: 18,
    padding: theme.spacing(1),
  },
  container: {
    marginBottom: theme.spacing(4),
  },
});

function Group(props) {
  const { title, description, classes, members } = props;
  return (
    <div>
      <Typography gutterBottom component="h2" variant="h5">
        {title}
      </Typography>
      <Typography gutterBottom>{description}</Typography>
      <Grid container spacing={2} className={classes.container}>
        {members.map(member => (
          <Grid key={member.name} item xs={12} md={6}>
            <Paper>
              <Grid container wrap="nowrap">
                <Grid item>
                  <CardMedia
                    className={classes.cover}
                    image={`https://github.com/${member.github}.png`}
                    title="Avatar"
                  />
                </Grid>
                <Grid item>
                  <div className={classes.details}>
                    <Typography component="h3" variant="h5">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {member.flag}
                    </Typography>
                    <Typography color="textSecondary">{member.city}</Typography>
                    <Grid container>
                      {member.github && (
                        <IconButton
                          aria-label="GitHub"
                          component="a"
                          href={`https://github.com/${member.github}`}
                          className={classes.icon}
                        >
                          <Github fontSize="inherit" />
                        </IconButton>
                      )}
                      {member.twitter && (
                        <IconButton
                          aria-label="Twitter"
                          component="a"
                          href={`https://twitter.com/${member.twitter}`}
                          className={classes.icon}
                        >
                          <Twitter fontSize="inherit" />
                        </IconButton>
                      )}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

function Team(props) {
  return (
    <div>
      <Group
        title="Active Core Team"
        description={`The development of the project and its ecosystem is
guided by an international team,
some of whom have chosen to be featured below.`}
        members={activeCore}
        {...props}
      />
      <Group
        title="Core Team Emeriti"
        description={`We honor some no-longer-active core team members who have made
valuable contributions in the past.
They advise us from time-to-time.`}
        members={emeriti}
        {...props}
      />
      <Group
        title="Community Partners"
        description={`Some members of the community have so enriched it,
that they deserve special mention.`}
        members={partners}
        {...props}
      />
    </div>
  );
}

export default withStyles(styles)(Team);
