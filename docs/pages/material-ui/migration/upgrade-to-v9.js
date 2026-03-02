import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/upgrade-to-v9/upgrade-to-v9.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
