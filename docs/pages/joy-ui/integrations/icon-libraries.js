import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/joy/integrations/icon-libraries/icon-libraries.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
