import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { exactProp } from '@material-ui/utils';
import NoSsr from '@material-ui/core/NoSsr';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';
import MarkdownDocsFooter from './MarkdownDocsFooter';
import MarkdownDocsBody from './MarkdownDocsBody';

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
            <MarkdownDocsBody
              rendered={rendered}
              headers={headers}
              demos={demos}
              requireDemo={requireDemo}
              disableAd={disableAd}
            />
            <NoSsr>
              <MarkdownDocsFooter />
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
  docs: PropTypes.object,
  requireDemo: PropTypes.func,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}

export default withStyles(styles)(MarkdownDocs);
