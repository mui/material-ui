import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, createTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import Head from 'docs/src/modules/components/Head';
import BrandingProvider from 'docs/src/BrandingProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppFooter from 'docs/src/layouts/AppFooter';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import { useRouter } from 'next/router';
import { exactProp } from '@mui/utils';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import ROUTES from 'docs/src/route';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';

export const authors = {
  oliviertassinari: {
    name: 'Olivier Tassinari',
    avatar: 'https://avatars.githubusercontent.com/u/3165635',
    github: 'oliviertassinari',
  },
  mbrookes: {
    name: 'Matt Brookes',
    avatar: 'https://avatars.githubusercontent.com/u/357702',
    github: 'mbrookes',
  },
  eps1lon: {
    name: 'Sebastian Silbermann',
    avatar: 'https://avatars.githubusercontent.com/u/12292047',
    github: 'eps1lon',
  },
  mnajdova: {
    name: 'Marija Najdova',
    avatar: 'https://avatars.githubusercontent.com/u/4512430',
    github: 'mnajdova',
  },
  michaldudak: {
    name: 'Michał Dudak',
    avatar: 'https://avatars.githubusercontent.com/u/4696105',
    github: 'michaldudak',
  },
  siriwatknp: {
    name: 'Siriwat Kunaporn',
    avatar: 'https://avatars.githubusercontent.com/u/18292247',
    github: 'siriwatknp',
  },
  'danilo-leal': {
    name: 'Danilo Leal',
    avatar: 'https://avatars.githubusercontent.com/u/67129314',
    github: 'danilo-leal',
  },
  m4theushw: {
    name: 'Matheus Wichman',
    avatar: 'https://avatars.githubusercontent.com/u/42154031',
    github: 'm4theushw',
  },
  flaviendelangle: {
    name: 'Flavien Delangle',
    avatar: 'https://avatars.githubusercontent.com/u/3309670',
    github: 'flaviendelangle',
  },
  DanailH: {
    name: 'Danail Hadjiatanasov',
    avatar: 'https://avatars.githubusercontent.com/u/5858539',
    github: 'DanailH',
  },
  alexfauquette: {
    name: 'Alexandre Fauquette',
    avatar: 'https://avatars.githubusercontent.com/u/45398769',
    github: 'alexfauquette',
  },
};

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    background:
      theme.palette.mode === 'dark'
        ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
        : `linear-gradient(180deg, ${theme.palette.grey[50]} 0%, #FFFFFF 100%)`,
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  container: {
    paddingTop: 60 + 20,
    marginBottom: theme.spacing(8),
    maxWidth: `calc(740px + ${theme.spacing(12)})`,
    '& h1': {
      marginBottom: theme.spacing(3),
    },
    '& .markdown-body': {
      fontSize: theme.typography.pxToRem(17),
      lineHeight: 1.7,
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
    ...theme.typography.caption,
    fontWeight: 500,
  },
});

const AuthorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: theme.spacing(2),
  '& .author': {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(3),
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
    <BrandingProvider>
      <AppHeader />
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
            href={ROUTES.blog}
            {...(ROUTES.blog.startsWith('http') && {
              rel: 'nofollow',
            })}
            color="text.secondary"
            variant="body2"
            className={classes.back}
          >
            <ChevronLeftRoundedIcon fontSize="small" sx={{ mr: 0.5 }} />
            {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
            {'Back to blog'}
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
                      sx={{ width: 36, height: 36 }}
                      alt=""
                      src={`${authors[author].avatar}?s=${32}`}
                      srcSet={`${authors[author].avatar}?s=${32 * 2} 2x`}
                    />
                    <div>
                      <Typography variant="body2" fontWeight="500">
                        {authors[author].name}
                      </Typography>
                      <Link
                        href={`https://github.com/${authors[author].github}`}
                        color="text.secondary"
                        variant="body2"
                        sx={{ fontWeight: 500 }}
                      >
                        @{authors[author].github}
                      </Link>
                    </div>
                  </div>
                ))}
              </AuthorsContainer>
              <Divider sx={{ marginBottom: (theme) => theme.spacing(6) }} />
            </React.Fragment>
          ) : null}
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </AppContainer>
        <HeroEnd />
        <Divider />
        <AppFooter />
      </div>
    </BrandingProvider>
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
