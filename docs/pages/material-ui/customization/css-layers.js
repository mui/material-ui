import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/customization/css-layers/css-layers.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
