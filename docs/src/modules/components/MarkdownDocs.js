import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import MarkdownElement from '@material-ui/docs/MarkdownElement';
import Head from 'docs/src/modules/components/Head';
import AppContent from 'docs/src/modules/components/AppContent';
import Demo from 'docs/src/modules/components/Demo';
import AppFrame from 'docs/src/modules/components/AppFrame';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import EditPage from 'docs/src/modules/components/EditPage';
import MarkdownDocsContents from 'docs/src/modules/components/MarkdownDocsContents';
import { getHeaders, getTitle, getDescription } from 'docs/src/modules/utils/parseMarkdown';

const styles = theme => ({
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  markdownElement: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit}px`,
  },
});

const demoRegexp = /^"demo": "(.*)"/;
const SOURCE_CODE_ROOT_URL = 'https://github.com/mui-org/material-ui/blob/master';

function MarkdownDocs(props) {
  const { classes, demos, disableAd, markdown, markdownLocation: markdownLocationProp } = props;
  const headers = getHeaders(markdown);

  return (
    <MarkdownDocsContents markdown={markdown} markdownLocation={markdownLocationProp}>
      {({ contents, markdownLocation }) => (
        <AppFrame>
          <Head
            title={`${headers.title || getTitle(markdown)} - Material-UI`}
            description={headers.description || getDescription(markdown)}
          />
          <AppTableOfContents contents={contents} />
          {disableAd ? null : (
            <Portal container={() => document.querySelector('.description')}>
              <Ad />
            </Portal>
          )}
          <AppContent className={classes.root}>
            <div className={classes.header}>
              <EditPage
                markdownLocation={markdownLocation}
                sourceCodeRootUrl={SOURCE_CODE_ROOT_URL}
              />
            </div>
            {contents.map((content, index) => {
              const match = content.match(demoRegexp);

              if (match && demos) {
                let demoOptions;
                try {
                  demoOptions = JSON.parse(`{${content}}`);
                } catch (err) {
                  console.error(err); // eslint-disable-line no-console
                  return null;
                }

                const name = demoOptions.demo;
                warning(demos && demos[name], `Missing demo: ${name}.`);
                return (
                  <Demo
                    key={content}
                    js={demos[name].js}
                    raw={demos[name].raw}
                    index={index}
                    demoOptions={demoOptions}
                    githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
                  />
                );
              }

              return (
                <MarkdownElement className={classes.markdownElement} key={content} text={content} />
              );
            })}
          </AppContent>
        </AppFrame>
      )}
    </MarkdownDocsContents>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  markdown: PropTypes.string.isRequired,
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  markdownLocation: PropTypes.string,
};

MarkdownDocs.defaultProps = {
  disableAd: false,
};

export default withStyles(styles)(MarkdownDocs);
