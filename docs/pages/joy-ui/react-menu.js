import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/components/menu/menu.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
