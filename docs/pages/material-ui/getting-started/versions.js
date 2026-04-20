import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import VersionsContext from 'docs/pages/material-ui/getting-started/VersionsContext';
import * as pageProps from 'docs/data/material/getting-started/versions/versions.md?muiMarkdown';

async function fetchVersions() {
  if (process.env.NODE_ENV !== 'production') {
    return (await import('../../../versions.json')).default;
  }
  // #target-branch-reference
  const response = await fetch(
    'https://raw.githubusercontent.com/mui/material-ui/master/docs/versions.json',
  );
  return response.json();
}

export default function Page() {
  const [versions, setVersions] = React.useState([]);

  React.useEffect(() => {
    fetchVersions().then(setVersions);
  }, []);

  return (
    <VersionsContext.Provider value={versions}>
      <MarkdownDocs {...pageProps} />
    </VersionsContext.Provider>
  );
}
