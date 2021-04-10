import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContainer from 'docs/src/modules/components/AppContainer';
import { useRouter } from 'next/router';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import AppFooter from 'docs/src/modules/components/AppFooter';
import { exactProp } from '@material-ui/utils';
import MarkdownElement from './MarkdownElement';

const authors = {
  oliviertassinari: {
    name: 'Olivier Tassinari',
    github: 'oliviertassinari',
  },
  mbrookes: {
    name: 'Matt Brookes',
    github: 'mbrookes',
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
    maxWidth: 680 + theme.spacing(8 + 4),
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
  avatar: {
    display: 'flex',
    gap: theme.spacing(3),
    '& > div': {
      marginTop: theme.spacing(-1),
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(5),
      fontWeight: theme.typography.fontWeightMedium,
      '& .MuiAvatar-root': {
        marginRight: theme.spacing(1),
      },
    },
  },
});

function TopLayoutBlog(props) {
  const { classes, docs } = props;
  const { description, rendered, title, headers } = docs.en;
  const finalTitle = title || headers.title;
  const router = useRouter();

  return (
    <AppFrame disableDrawer>
      <Head
        title={`${finalTitle} - Material-UI`}
        description={description}
        largeCard={headers.card === 'true' ? true : undefined}
        card={
          headers.card === 'true'
            ? `https://material-ui.com/static${router.pathname}/card.png`
            : undefined
        }
      />
      <div className={classes.root}>
        <AppContainer className={classes.container}>
          <Link
            href="https://medium.com/material-ui"
            rel="nofollow"
            color="textSecondary"
            variant="body2"
            className={classes.back}
          >
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
              <div className={classes.avatar}>
                {headers.authors.map((author) => (
                  <div key={author}>
                    <Avatar src={`https://github.com/${authors[author].github}.png`} />
                    {authors[author].name}
                  </div>
                ))}
              </div>
            </React.Fragment>
          ) : null}
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </AppContainer>
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

export default withStyles(styles)(TopLayoutBlog);
