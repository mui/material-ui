import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/system/display/display.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
