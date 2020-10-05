import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import { exactProp } from '@material-ui/utils';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import { SOURCE_CODE_ROOT_URL } from 'docs/src/modules/constants';
import Demo from 'docs/src/modules/components/Demo';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';
import ComponentLinkHeader from 'docs/src/modules/components/ComponentLinkHeader';
import MarkdownDocsFooter from './MarkdownDocsFooter';

const markdownComponents = {
  'modules/components/ComponentLinkHeader.js': ComponentLinkHeader,
};

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  container: {
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ad: {
    '& .description': {
      marginBottom: 198,
    },
    '& .description.ad': {
      marginBottom: 40,
    },
  },
  toc: {
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 175px)',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 175px - 240px)',
    },
  },
});

function MarkdownDocs(props) {
  const { classes, disableAd = false, disableToc = false, demos = {}, docs, requireDemo } = props;

  const t = useSelector((state) => state.options.t);
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const { description, location, rendered, title, toc, headers } = docs[userLanguage] || docs.en;
  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  return (
    <AppFrame>
      <AdManager>
        <Head title={`${title} - Material-UI`} description={description} />
        {disableAd ? null : (
          <AdGuest>
            <Ad placement="body" />
          </AdGuest>
        )}
        <div
          className={clsx(classes.root, {
            [classes.ad]: !disableAd,
            [classes.toc]: !disableToc,
          })}
        >
          <AppContainer className={classes.container}>
            <div className={classes.actions}>
              <EditPage markdownLocation={location} />
            </div>
            {rendered.map((renderedMarkdownOrDemo, index) => {
              if (typeof renderedMarkdownOrDemo === 'string') {
                return <MarkdownElement key={index} renderedMarkdown={renderedMarkdownOrDemo} />;
              }

              if (renderedMarkdownOrDemo.component) {
                const Component = markdownComponents[renderedMarkdownOrDemo.component];
                return <Component key={index} headers={headers} options={renderedMarkdownOrDemo} />;
              }

              const name = renderedMarkdownOrDemo.demo;
              const demo = demos?.[name];
              if (demo === undefined) {
                const errorMessage = [
                  `Missing demo: ${name}. You can use one of the following:`,
                  Object.keys(demos),
                ].join('\n');

                if (userLanguage === 'en') {
                  throw new Error(errorMessage);
                }

                if (process.env.NODE_ENV !== 'production') {
                  console.error(errorMessage);
                }

                const warnIcon = (
                  <span role="img" aria-label={t('emojiWarning')}>
                    ⚠️
                  </span>
                );
                return (
                  <div key={index}>
                    {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                    {warnIcon} Missing demo `{name}` {warnIcon}
                  </div>
                );
              }

              return (
                <Demo
                  key={index}
                  demo={{
                    raw: demo.raw,
                    js: requireDemo(demo.module).default,
                    rawTS: demo.rawTS,
                    tsx: demo.moduleTS ? requireDemo(demo.moduleTS).default : null,
                  }}
                  disableAd={disableAd}
                  demoOptions={renderedMarkdownOrDemo}
                  githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
                />
              );
            })}
            <NoSsr>
              <MarkdownDocsFooter docs={docs} />
            </NoSsr>
          </AppContainer>
        </div>
        {disableToc ? null : <AppTableOfContents items={toc} />}
      </AdManager>
    </AppFrame>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  requireDemo: PropTypes.func,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}

export default withStyles(styles)(MarkdownDocs);
