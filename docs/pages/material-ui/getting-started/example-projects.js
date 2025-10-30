import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/getting-started/example-projects/example-projects.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} disableAd />;
}
