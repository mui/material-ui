import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from './headers.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
