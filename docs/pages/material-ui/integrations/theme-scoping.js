import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/integrations/theme-scoping/theme-scoping.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
