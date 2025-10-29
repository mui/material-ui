import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/composition/composition.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
