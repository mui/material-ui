import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppContent from 'docs/src/modules/components/AppContent';
import useMarkdownDocs from 'docs/src/modules/components/useMarkdownDocs';
import { getHeaders, getTitle, getDescription } from 'docs/src/modules/utils/parseMarkdown';
import HomeFooter from 'docs/src/modules/components/HomeFooter';

const styles = theme => ({
  root: {
    flex: '1 0 100%',
  },
  appContent: {
    marginBottom: theme.spacing(20),
  },
});

function TopLayoutCompany(props) {
  const {
    classes,
    markdown: markdownProp,
    markdownLocation: markdownLocationProp,
    req,
    reqPrefix,
    reqSource,
  } = props;

  const markdownDocs = useMarkdownDocs({
    markdown: markdownProp,
    markdownLocation: markdownLocationProp,
    req,
    reqPrefix,
    reqSource,
  });

  const headers = getHeaders(markdownDocs.markdown);

  return (
    <AppFrame>
      <Head
        title={`${headers.title || getTitle(markdownDocs.markdown)} - Material-UI`}
        description={headers.description || getDescription(markdownDocs.markdown)}
      />
      <div className={classes.root}>
        <AppContent disableAd disableToc className={classes.appContent}>
          {markdownDocs.element}
        </AppContent>
        <HomeFooter />
      </div>
    </AppFrame>
  );
}

TopLayoutCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  markdown: PropTypes.string,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
  req: PropTypes.func,
  reqPrefix: PropTypes.string,
  reqSource: PropTypes.func,
};

export default withStyles(styles)(TopLayoutCompany);
