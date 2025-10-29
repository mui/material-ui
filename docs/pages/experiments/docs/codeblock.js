import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from './codeblock.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
