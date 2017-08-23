// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import warning from 'warning';
import Head from 'next/head';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppContent from 'docs/src/modules/components/AppContent';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Demo from 'docs/src/modules/components/Demo';
import { getComponents, getContents, getTitle } from 'docs/src/modules/utils/parseMarkdown';

const styles = {
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
};

const demoRegexp = /^demo='(.*)'$/;
const SOURCE_CODE_ROOT_URL = 'https://github.com/callemall/material-ui/tree/v1-beta';

function MarkdownDocs(props, context) {
  const { classes, demos, markdown } = props;
  const contents = getContents(markdown);
  const components = getComponents(markdown);

  let sourceLocation = context.activePage.pathname;
  // Hack for handling the nested demos
  if (sourceLocation.indexOf('/demos') === 0) {
    const token = sourceLocation.split('/');
    token.push(token[token.length - 1]);
    sourceLocation = token.join('/');
  }

  return (
    <AppContent className={classes.root}>
      <Head>
        <title>
          {getTitle(markdown)}
        </title>
      </Head>
      <div className={classes.header}>
        <Button component="a" href={`${SOURCE_CODE_ROOT_URL}/docs/src/pages${sourceLocation}.md`}>
          {'Edit this page'}
        </Button>
      </div>
      {contents.map(content => {
        const match = content.match(demoRegexp);

        if (match) {
          const name = match[1];
          warning(demos && demos[name], `Missing demo: ${name}.`);
          return <Demo key={content} name={name} js={demos[name].js} raw={demos[name].raw} />;
        }

        return <MarkdownElement key={content} text={content} />;
      })}
      {components.length > 0
        ? <MarkdownElement
            text={`
## API

${components
              .map(component => `- [&lt;${component} /&gt;](/api/${kebabCase(component)})`)
              .join('\n')}
            `}
          />
        : null}
    </AppContent>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object,
  markdown: PropTypes.string.isRequired,
};

MarkdownDocs.contextTypes = {
  activePage: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(MarkdownDocs);
