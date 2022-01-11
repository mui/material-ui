import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, createTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContainer from 'docs/src/modules/components/AppContainer';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AppFooter from 'docs/src/layouts/AppFooter';
import { exactProp } from '@mui/utils';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

const authors = {
  oliviertassinari: {
    name: 'Olivier Tassinari',
    avatar: 'https://avatars.githubusercontent.com/u/3165635',
  },
  mbrookes: {
    name: 'Matt Brookes',
    avatar: 'https://avatars.githubusercontent.com/u/357702',
  },
  eps1lon: {
    name: 'Sebastian Silbermann',
    avatar: 'https://avatars.githubusercontent.com/u/12292047',
  },
  mnajdova: {
    name: 'Marija Najdova',
    avatar: 'https://avatars.githubusercontent.com/u/4512430',
  },
  michaldudak: {
    name: 'Michał Dudak',
    avatar: 'https://avatars.githubusercontent.com/u/4696105',
  },
  siriwatknp: {
    name: 'Siriwat Kunaporn',
    avatar: 'https://avatars.githubusercontent.com/u/18292247',
  },
  'danilo-leal': {
    name: 'Danilo Leal',
    avatar: 'https://avatars.githubusercontent.com/u/67129314',
  },
  m4theushw: {
    name: 'Matheus Wichman',
    avatar: 'https://avatars.githubusercontent.com/u/42154031',
  },
  flaviendelangle: {
    name: 'Flavien Delangle',
    avatar: 'https://avatars.githubusercontent.com/u/3309670',
  },
  DanailH: {
    name: 'Danail Hadjiatanasov',
    avatar: 'https://avatars.githubusercontent.com/u/5858539',
  },
  alexfauquette: {
    name: 'Alexandre Fauquette',
    avatar: 'https://avatars.githubusercontent.com/u/45398769',
  },
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  back: {
    display: 'block',
    marginBottom: theme.spacing(4),
  },
  container: {
    marginBottom: theme.spacing(20),
    maxWidth: `calc(680px + ${theme.spacing(12)})`,
    '& h1': {
      marginBottom: theme.spacing(4),
    },
    '& .markdown-body': {
      fontSize: theme.typography.pxToRem(17),
      lineHeight: 1.7,
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(4),
      },
    },
    '& img, & video': {
      display: 'block',
      margin: 'auto',
    },
    '& pre': {
      fontSize: theme.typography.pxToRem(16),
    },
    '& .blog-description': {
      fontSize: theme.typography.pxToRem(14),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      '& a': {
        color: theme.palette.text.secondary,
        textDecoration: 'underline',
      },
    },
  },
  time: {
    color: theme.palette.text.secondary,
    ...theme.typography.body2,
  },
});

const AuthorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(1),
  '& .author': {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium,
    '& .MuiAvatar-root': {
      marginRight: theme.spacing(1),
    },
  },
}));

function TopLayoutBlog(props) {
  const { classes, docs } = props;
  const { description, rendered, title, headers } = docs.en;
  const finalTitle = title || headers.title;
  const router = useRouter();

  return (
    <AppFrame disableDrawer>
      <Head
        title={`${finalTitle} - MUI`}
        description={description}
        largeCard={headers.card === 'true' ? true : undefined}
        card={
          headers.card === 'true' ? `https://mui.com/static${router.pathname}/card.png` : undefined
        }
      />
      <div className={classes.root}>
        <AppContainer component="main" className={classes.container}>
          <Link
            href="https://medium.com/material-ui"
            rel="nofollow"
            color="text.secondary"
            variant="body2"
            className={classes.back}
          >
            {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
            {'< Back to blog'}
          </Link>
          {headers.title ? (
            <React.Fragment>
              <time dateTime={headers.date} className={classes.time}>
                {new Intl.DateTimeFormat('en', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).format(new Date(headers.date))}
              </time>
              <MarkdownElement>
                <h1>{headers.title}</h1>
              </MarkdownElement>
              <AuthorsContainer>
                {headers.authors.map((author) => (
                  <div key={author} className="author">
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt=""
                      src={`${authors[author].avatar}?s=${32}`}
                      srcSet={`${authors[author].avatar}?s=${32 * 2} 2x`}
                    />
                    <Typography variant="body2">{authors[author].name}</Typography>
                  </div>
                ))}
              </AuthorsContainer>
            </React.Fragment>
          ) : null}
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </AppContainer>
        <Divider />
        <AppFooter />
      </div>
    </AppFrame>
  );
}

TopLayoutBlog.propTypes = {
  classes: PropTypes.object.isRequired,
  docs: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  TopLayoutBlog.propTypes = exactProp(TopLayoutBlog.propTypes);
}

const defaultTheme = createTheme();
export default withStyles(styles, { defaultTheme })(TopLayoutBlog);
