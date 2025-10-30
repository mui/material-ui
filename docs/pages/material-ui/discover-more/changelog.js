import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/discover-more/changelog/changelog.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
