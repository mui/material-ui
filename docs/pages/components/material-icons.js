import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import Markdown from 'docs/src/pages/components/material-icons/material-icons.md';
import SearchIcons from 'docs/src/pages/components/material-icons/SearchIcons';

const req = name => {
  const map = {
    'material-icons.md': Markdown,
    'SearchIcons.js': {
      default: SearchIcons,
    },
  };
  return map[name];
};
req.keys = () => ['material-icons.md', 'SearchIcons.js'];
const reqPrefix = 'pages/components/material-icons';

export default function Page() {
  return <MarkdownDocs disableToc req={req} reqSource={() => {}} reqPrefix={reqPrefix} />;
}
