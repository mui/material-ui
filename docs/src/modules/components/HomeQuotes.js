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
      'Such a great library. I have used Material-UI for the last two years as the main react ui library in my projects (in more than 4 companies!) and I find that it\'s really great! A lot of good work and dedication are put in there. Salute to the team!',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1144184864754851840/WIVBqpWM_400x400.jpg',
    name: 'Matthias Margot',
    username: '@matthiasmargot',
    quote:
      'The DX on Material-UI is absolutely insane and that package has shaped my approach to Component API Design / Composition Design & Style System Design. I think those guys got it idiomatically right, wonderful product.',
  },
];

const styles = theme => ({
  root: {
    padding: theme.spacing(2),
    minHeight: 160,
    paddingTop: theme.spacing(5),
  },
  container: {
    marginBottom: theme.spacing(4),
  },
  users: {
    padding: theme.spacing(10, 4, 0),
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
            <Grid container spacing={4} className={classes.grid}>
              {quotes.map(quote => (
                <Grid item xs={12} md={6} key={quote.username}>
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
