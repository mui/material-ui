import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import requireMarkdown from 'docs/src/modules/utils/requireMarkdown';

const req = require.context('markdown', true, /.md$/);

function Page(props) {
  return <MarkdownDocs markdown={requireMarkdown(req, `./api${props.lang}.md`)} />;
}

export default withRoot(Page);
