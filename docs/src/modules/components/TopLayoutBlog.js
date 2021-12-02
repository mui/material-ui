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
    github: 'oliviertassinari',
  },
  mbrookes: {
    name: 'Matt Brookes',
    github: 'mbrookes',
  },
  eps1lon: {
    name: 'Sebastian Silbermann',
    github: 'eps1lon',
  },
  mnajdova: {
    name: 'Marija Najdova',
    github: 'mnajdova',
  },
  michaldudak: {
    name: 'Michał Dudak',
    github: 'michaldudak',
  },
  siriwatknp: {
    name: 'Siriwat Kunaporn',
    github: 'siriwatknp',
  },
  'danilo-leal': {
    name: 'Danilo Leal',
    github: 'danilo-leal',
  },
  m4theushw: {
    name: 'Matheus Wichman',
    github: 'm4theushw',
  },
  flaviendelangle: {
    name: 'Flavien Delangle',
    github: 'flaviendelangle',
  },
  DanailH: {
    name: 'Danail Hadjiatanasov',
    github: 'DanailH',
  },
  alexfauquette: {
    name: 'Alexandre Fauquette',
    github: 'alexfauquette',
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
                      src={`https://github.com/${authors[author].github}.png`}
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
