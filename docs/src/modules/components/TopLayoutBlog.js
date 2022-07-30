import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import Head from 'docs/src/modules/components/Head';
import BrandingProvider from 'docs/src/BrandingProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppFooter from 'docs/src/layouts/AppFooter';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import { useRouter } from 'next/router';
import { exactProp } from '@mui/utils';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import ROUTES from 'docs/src/route';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Link from 'docs/src/modules/components/Link';

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
  samuelsycamore: {
    name: 'Sam Sycamore',
    avatar: 'https://avatars.githubusercontent.com/u/71297412',
    github: 'samuelsycamore',
  },
  josefreitas: {
    name: 'José Freitas',
    avatar: 'https://avatars.githubusercontent.com/u/550141',
    github: 'joserodolfofreitas',
  },
  cherniavskii: {
    name: 'Andrew Cherniavskyi',
    avatar: 'https://avatars.githubusercontent.com/u/13808724',
    github: 'cherniavskii',
  },
};

const classes = {
  back: 'TopLayoutBlog-back',
  time: 'TopLayoutBlog-time',
  container: 'TopLayoutBlog-container',
};

const BLOG_MAX_WIDTH = 692;

const styles = ({ theme }) => ({
  flexGrow: 1,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(180deg, ${theme.palette.primaryDark[900]} 0%, #001E3C 100%)`
      : `linear-gradient(180deg, ${theme.palette.grey[50]} 0%, #FFFFFF 100%)`,
  backgroundSize: '100% 300px',
  backgroundRepeat: 'no-repeat',
  [`& .${classes.back}`]: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(-1),
  },
  [`& .${classes.container}`]: {
    paddingTop: 60 + 20,
    marginBottom: theme.spacing(1),
    maxWidth: `calc(${BLOG_MAX_WIDTH}px + ${theme.spacing(2 * 2)})`,
    [theme.breakpoints.up('md')]: {
      maxWidth: `calc(${BLOG_MAX_WIDTH}px + ${theme.spacing(3 * 2)})`,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: `calc(${BLOG_MAX_WIDTH}px + ${theme.spacing(8 * 2)})`,
    },
    '& h1': {
      marginBottom: theme.spacing(3),
    },
    '& .markdown-body': {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1.7,
    },
    '& img, & video': {
      display: 'block',
      margin: 'auto',
    },
    '& strong': {
      color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[900],
    },
    '& pre': {
      fontSize: theme.typography.pxToRem(16),
    },
    '& summary': {
      padding: 8,
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900],
    },
    '& details': {
      paddingLeft: 16,
      paddingRight: 16,
      background:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.primary[900], 0.3)
          : alpha(theme.palette.grey[50], 0.5),
      border: '1px solid',
      borderRadius: 10,
      borderColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[200],
      transitionProperty: 'all',
      transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '200ms',
      '&:hover, &:focus-visible': {
        background:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primary[900], 0.4)
            : theme.palette.grey[50],
        borderColor:
          theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : theme.palette.grey[300],
      },
    },
    '& th': {
      textAlign: 'left',
      borderBottom: `3px solid rgba(62, 80, 96, 0.2) !important`,
    },
    '& .blog-description': {
      fontSize: theme.typography.pxToRem(13),
      textAlign: 'left',
      color: theme.palette.grey[600],
      '& a': {
        color:
          theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
        textDecoration: 'underline',
      },
    },
  },
  [`& .${classes.time}`]: {
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

const Root = styled('div')(styles);

function TopLayoutBlog(props) {
  const { className, docs } = props;
  const { description, rendered, title, headers } = docs.en;
  const finalTitle = title || headers.title;
  const router = useRouter();

  return (
    <BrandingProvider>
      <AppHeader />
      <Head
        title={`${finalTitle} - MUI`}
        description={description}
        largeCard={headers.card === 'true'}
        disableAlternateLocale
        card={
          headers.card === 'true'
            ? `https://mui.com/static${router.pathname}/card.png`
            : 'https://mui.com/static/logo.png'
        }
      />
      <Root className={className}>
        <AppContainer component="main" className={classes.container}>
          <Link
            href={ROUTES.blog}
            {...(ROUTES.blog.startsWith('http') && {
              rel: 'nofollow',
            })}
            color="primary"
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
                      src={`${authors[author].avatar}?s=${36}`}
                      srcSet={`${authors[author].avatar}?s=${36 * 2} 2x`}
                    />
                    <div>
                      <Typography variant="body2" fontWeight="500">
                        {authors[author].name}
                      </Typography>
                      <Link
                        href={`https://github.com/${authors[author].github}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        color="primary"
                        variant="body2"
                        sx={{ fontWeight: 500 }}
                      >
                        @{authors[author].github}
                      </Link>
                    </div>
                  </div>
                ))}
              </AuthorsContainer>
            </React.Fragment>
          ) : null}
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </AppContainer>
        <HeroEnd />
        <Divider />
        <AppFooter />
      </Root>
    </BrandingProvider>
  );
}

TopLayoutBlog.propTypes = {
  className: PropTypes.string,
  docs: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  TopLayoutBlog.propTypes = exactProp(TopLayoutBlog.propTypes);
}

export default TopLayoutBlog;
