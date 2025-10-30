import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/migration/migrating-default-theme.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
