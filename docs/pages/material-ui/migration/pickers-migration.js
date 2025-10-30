import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/pickers-migration/pickers-migration.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
