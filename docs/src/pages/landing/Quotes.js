import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'docs/src/modules/components/Link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TwitterIcon from '@material-ui/icons/Twitter';
import NoSsr from '@material-ui/core/NoSsr';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

const quotes = [
  {
    avatar: 'https://pbs.twimg.com/profile_images/1134188599170215936/9CUB-yeB',
    name: 'Aumit Leon',
    username: '@aumitleon',
    tweet: 'https://twitter.com/aumitleon/status/1210396946566963200',
    quote:
      'Material-UI continues to blow my mind how easily I can put together really aesthetic and functional components and minimize overhead.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1231452795368329216/GhjrxYH2',
    name: 'Derek Shanks',
    username: '@fragileglass',
    tweet: 'https://twitter.com/fragileglass/status/1205256087290753025',
    quote:
      'It’s a game changer with how nicely it works with React. It’s made working with React so much more enjoyable. Everything is configurable and predictable. Bootstrap was killing me. It was hijacking my whole project.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1214337550791299072/ybsFasgV',
    name: 'Andréa',
    username: '@azza_314',
    tweet: 'https://twitter.com/azza_314/status/1247384522238259205',
    quote:
      "Started using @MaterialUI for #ReactJS & I'm ridiculously impressed. They put a ton of work into their documentation and their library is incredibly user friendly. Was able to add a sidebar, header, & modal  quickly!",
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1220819548523331584/3T1G8g1q',
    name: 'Mohamed EL AYADI',
    username: '@MohamedELAYAD19',
    tweet: 'https://twitter.com/MohamedELAYAD19/status/1208118580430229504',
    quote:
      "Such a great library. I have used Material-UI for the last two years as the main react ui library in my projects (in more than 4 companies!) and I find that it's really great! A lot of good work and dedication are put in there. Salute to the team!",
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1144184864754851840/WIVBqpWM',
    name: 'Matthias Margot',
    username: '@matthiasmargot',
    tweet: 'https://twitter.com/matthiasmargot/status/1215482285681795072',
    quote:
      'The DX on Material-UI is absolutely insane and that package has shaped my approach to Component API Design / Composition Design & Style System Design. I think those guys got it idiomatically right, wonderful product.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1129370929409056769/Zkwjy9_I',
    name: 'Samantha Durrant',
    username: '@SamDurrant_',
    tweet: 'https://twitter.com/SamDurrant_/status/1214741763455209473',
    quote:
      'Began coding out the front end of my app today. Used MaterialUI for the first time and love how easy it is to make things look nice. It’s also really cool to see all the hard work building out the backend of my app come to life in the front end!',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/849731047625502720/nudIAz2B',
    name: 'Rodrigo Ciprian',
    username: '@rodrigocipriani',
    tweet: 'https://twitter.com/rodrigocipriani/status/1215578130217340929',
    quote:
      'I always use Material-UI, it is really awesome, and it have a looot of very good and easy to use components.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1231452795368329216/GhjrxYH2',
    name: 'Derek Shanks',
    username: '@fragileglass',
    tweet: 'https://twitter.com/fragileglass/status/1255170173226680320',
    quote:
      'Sometimes a library is so incredibly awesome. You don’t want to use anything else. I absolutely love that I can have the Material look or completely customize @MaterialUI to any look I desire.',
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1214337550791299072/ybsFasgV',
    name: 'Andréa',
    username: '@azza_314',
    tweet: 'https://twitter.com/azza_314/status/1250595347543371776',
    quote:
      "Becoming more obsessed with @MaterialUI for #React. Along with #TypeScript support, they have phenomenal documentation, and an impressive design section with customizable themes and case studies. This is the best front-end library I've ever worked with!",
  },
];

const useStyles = makeStyles(
  (theme) => ({
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
  }),
  { name: 'Quotes' },
);

const useQuoteStyles = makeStyles(
  (theme) => ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    cardAction: {
      height: '100%',
    },
    avatar: {
      width: 48,
      height: 48,
    },
    twitter: {
      marginLeft: 'auto',
      color: theme.palette.primary.light,
    },
    name: {
      fontSize: 16,
    },
    quote: {
      paddingBottom: '16px !important',
      paddingTop: 0,
    },
  }),
  { name: 'HomeQuote' },
);

const QuoteLink = React.forwardRef((props, ref) => {
  return (
    <Link
      data-ga-event-category="quote"
      data-ga-event-action="click"
      target="_blank"
      rel="noopener nofollow"
      ref={ref}
      underline="none"
      {...props}
    />
  );
});

function Quote(props) {
  const { avatar, href, name, quote, userName } = props;
  const classes = useQuoteStyles();

  return (
    <Card variant="outlined" className={classes.card}>
      <CardActionArea component={QuoteLink} href={href} className={classes.cardAction}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item>
              <Avatar
                src={`${avatar}_normal.jpg`}
                srcSet={`${avatar}_bigger.jpg 2x`}
                alt={name}
                className={classes.avatar}
              />
            </Grid>
            <Grid item>
              <Typography component="div" variant="h6" color="textPrimary" className={classes.name}>
                {name}
              </Typography>
              <Typography component="div" variant="subtitle2" color="textSecondary">
                {userName}
              </Typography>
            </Grid>
            <Grid item className={classes.twitter}>
              <TwitterIcon />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent className={classes.quote}>
          <Typography color="textPrimary" variant="body2">
            {quote}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

Quote.propTypes = {
  avatar: PropTypes.string,
  href: PropTypes.string,
  name: PropTypes.string,
  quote: PropTypes.string,
  userName: PropTypes.string,
};

const startIndex = Math.floor(Math.random() * quotes.length);
const selectedQuotes = [];
for (let i = 0; i < 3; i += 1) {
  selectedQuotes.push(quotes[(startIndex + i) % quotes.length]);
}

export default function Quotes() {
  const classes = useStyles();
  const t = useSelector((state) => state.options.t);

  return (
    <div className={classes.root}>
      <NoSsr defer>
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
              {selectedQuotes.map((quote) => (
                <Grid item xs={12} md={4} key={quote.username}>
                  <Quote
                    avatar={quote.avatar}
                    href={quote.tweet}
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
