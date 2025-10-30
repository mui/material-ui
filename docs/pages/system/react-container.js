import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/system/components/container/container.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
