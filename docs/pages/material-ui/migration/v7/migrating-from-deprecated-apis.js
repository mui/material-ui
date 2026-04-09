import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/migration/upgrade-to-v7/migrating-from-deprecated-apis.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
