import path from 'path';
import fs from 'fs';
import * as React from 'react';
import { findPagesMarkdown } from 'docs/src/modules/utils/find';
import { prepareMarkdown } from '@mui/markdown';
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContainer from 'docs/src/modules/components/AppContainer';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import Link from 'docs/src/modules/components/Link';
import AppFooter from 'docs/src/layouts/AppFooter';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

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

const steps = [
  {
    pathname: '/learn/basics/overview',
    title: 'Overview',
  },
  {
    pathname: '/learn/basics/introduction',
    title: 'Introduction',
  },
];

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
          <ul>
            {steps.map((step) => (
              <li>
                <Link href={step.pathname}>{step.title}</Link>
              </li>
            ))}
          </ul>
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

const TopLayoutBlog2 = withStyles(styles)(TopLayoutBlog);

export default function Lesson(props) {
  const { learn, preparedMarkdown } = props;
  return (
    <div>
      {`Lesson ${learn.course}/${learn.lesson}`}
      <TopLayoutBlog2 docs={preparedMarkdown.docs} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const directory = path.resolve(process.cwd(), 'src/pages/learn');
  const learnPages = findPagesMarkdown(directory);
  const page = learnPages.find(
    (learnPage) => learnPage.pathname === `/learn/${params.course}/${params.lesson}`,
  );
  const markdown = fs.readFileSync(page.filename, { encoding: 'utf8' });
  const preparedMarkdown = prepareMarkdown({
    pageFilename: `learn/${params.course}`,
    translations: [
      {
        filename: '',
        userLanguage: 'en',
        markdown,
      },
    ],
  });
  return {
    props: {
      learn: params,
      preparedMarkdown,
    },
  };
}

export async function getStaticPaths() {
  const learnPages = findPagesMarkdown(path.resolve(process.cwd(), 'src/pages/learn'));

  return {
    paths: learnPages.map((learnPage) => {
      const [, , course, lesson] = learnPage.pathname.split('/');

      return {
        params: {
          course,
          lesson,
        },
      };
    }),
    fallback: false,
  };
}
