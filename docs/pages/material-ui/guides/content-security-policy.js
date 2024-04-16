import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import * as pageProps from 'docs/data/material/guides/content-security-policy/content-security-policy.md?muiMarkdown';

export default function Page() {
  return <MarkdownDocs {...pageProps} />;
}
