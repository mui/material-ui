import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from './og-card.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
