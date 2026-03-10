import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/customization/themed-components/themed-components.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
