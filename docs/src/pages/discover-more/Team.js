// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Github from 'docs/src/modules/components/Github';
import Twitter from 'docs/src/modules/components/Twitter';

const members = [
  {
    name: 'Hai Nguyen',
    github: 'hai-cea',
    twitter: 'haicea',
    city: 'Dallas, Texas, US',
  },
  {
    name: 'Olivier Tassinari',
    github: 'oliviertassinari',
    twitter: 'olivtassinari',
    city: 'Paris, France',
  },
  {
    name: 'Matt Brookes',
    github: 'mbrookes',
    twitter: 'randomtechdude',
    city: 'London, UK',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    city: 'Franklin, Tennessee, US',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    city: 'Toronto, ON',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    city: 'Freiburg, Germany',
  },
];

const styles = theme => ({
  root: {
    maxWidth: 600,
  },
  card: {
    display: 'flex',
    margin: theme.spacing.unit,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 124,
    height: 124,
    backgroundColor: theme.palette.background.default,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    margin: theme.spacing.unit,
    width: 20,
    height: 20,
  },
});

function Team(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      {members.map(member => (
        <Card key={member.name} className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={`https://github.com/${member.github}.png`}
            title="Picture"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography type="headline">{member.name}</Typography>
              <Typography type="subheading" color="secondary">
                {member.city}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              {member.github && (
                <IconButton
                  aria-label="github"
                  component="a"
                  href={`https://github.com/${member.github}`}
                  className={classes.icon}
                >
                  <Github />
                </IconButton>
              )}
              {member.twitter && (
                <IconButton
                  aria-label="twitter"
                  component="a"
                  href={`https://twitter.com/${member.twitter}`}
                  className={classes.icon}
                >
                  <Twitter />
                </IconButton>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

Team.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Team);
