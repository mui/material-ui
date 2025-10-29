import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/system/styled/styled.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
