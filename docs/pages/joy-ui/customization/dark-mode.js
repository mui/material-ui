import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/customization/dark-mode/dark-mode.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
