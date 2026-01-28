import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from './pro-feature.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
