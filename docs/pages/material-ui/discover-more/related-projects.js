import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/discover-more/related-projects/related-projects.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
