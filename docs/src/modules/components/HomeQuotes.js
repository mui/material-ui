import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HomeQuote from './HomeQuote';

const quotes = [
  {
    avatar: 'https://pbs.twimg.com/profile_images/1134188599170215936/9CUB-yeB_400x400.jpg',
    name: 'Aumit Leon',
    username: '@aumitleon',
    quote:
      'Material-UI continues to blow my mind how easily I can put together really aesthetic and functional components and minimize overhead.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1169043984561389568/pEdFvVIW_400x400.jpg',
    name: 'Derek Shanks',
    username: '@fragileglass',
    quote:
      'It’s a game changer with how nicely it works with React. It’s made working with React so much more enjoyable. Everything is configurable and predictable. Bootstrap was killing me. It was hijacking my whole project.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1220819548523331584/3T1G8g1q_400x400.jpg',
    name: 'Mohamed EL AYADI',
    username: '@MohamedELAYAD19',
    quote:
      "Such a great library. I have used Material-UI for the last two years as the main react ui library in my projects (in more than 4 companies!) and I find that it's really great! A lot of good work and dedication are put in there. Salute to the team!",
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1144184864754851840/WIVBqpWM_400x400.jpg',
    name: 'Matthias Margot',
    username: '@matthiasmargot',
    quote:
      'The DX on Material-UI is absolutely insane and that package has shaped my approach to Component API Design / Composition Design & Style System Design. I think those guys got it idiomatically right, wonderful product.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/849731047625502720/nudIAz2B_400x400.jpg',
    name: 'Rodrigo Ciprian',
    username: '@rodrigocipriani',
    quote:
      'I always use Material-UI, it is really awesome, and it have a looot of very good and easy to use components.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1129370929409056769/Zkwjy9_I_400x400.jpg',
    name: 'Samantha Durrant',
    username: '@SamDurrant_',
    quote:
      'Began coding out the front end of my app today. Used MaterialUI for the first time and love how easy it is to make things look nice. It’s also really cool to see all the hard work building out the backend of my app come to life in the front end!',
  },
];

const styles = theme => ({
  root: {
    minHeight: 160,
    paddingTop: theme.spacing(5),
    margin: theme.spacing(0, 2),
  },
  container: {
    marginBottom: theme.spacing(4),
  },
  users: {
    padding: theme.spacing(10, 0, 0),
  },
  grid: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  img: {
    margin: theme.spacing(1.5, 3),
  },
  button: {
    margin: theme.spacing(2, 0, 0),
  },
});

const startIndex = Math.floor(Math.random() * quotes.length);
const selectedQuotes = [];
for (let i = 0; i < 3; i++) {
  selectedQuotes.push(quotes[(startIndex + i) % quotes.length]);
}

function HomeQuotes(props) {
  const { classes } = props;
  const t = useSelector(state => state.options.t);

  return (
    <div className={classes.root}>
      <NoSsr>
        <Container maxWidth="md" className={classes.container} disableGutters>
          <Divider />
          <div className={classes.users}>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              {t('praise')}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
              {t('praiseDescr')}
            </Typography>
            <Grid container spacing={2} className={classes.grid}>
              {selectedQuotes.map(quote => (
                <Grid item xs={12} md={4} key={quote.username}>
                  <HomeQuote
                    avatar={quote.avatar}
                    name={quote.name}
                    userName={quote.username}
                    quote={quote.quote}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </NoSsr>
    </div>
  );
}

HomeQuotes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeQuotes);
