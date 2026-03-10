import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/main-features/color-inversion/color-inversion.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
