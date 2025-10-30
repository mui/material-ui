import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/experimental-api/classname-generator/classname-generator.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
