import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/customization/theme-typography/theme-typography.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
