import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/customization/theme-colors/theme-colors.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
