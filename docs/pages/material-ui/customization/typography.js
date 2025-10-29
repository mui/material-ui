import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/customization/typography/typography.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
