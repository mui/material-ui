import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/migration-v4/troubleshooting.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
