import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/components/card/card.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
