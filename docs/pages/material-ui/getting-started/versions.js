import * as React from 'react';
import { MarkdownDocs } from '@mui/internal-core-docs/MarkdownDocs';
import VersionsContext from 'docs/pages/material-ui/getting-started/VersionsContext';
import * as pageProps from 'docs/data/material/getting-started/versions/versions.md?muiMarkdown';
import { useFetchVersions } from '@mui/internal-core-docs/DocsProvider';

export default function Page() {
  const [versions, setVersions] = React.useState([]);
  const fetchVersions = useFetchVersions();

  React.useEffect(() => {
    fetchVersions().then(setVersions);
  }, []);

  return (
    <VersionsContext.Provider value={versions}>
      <MarkdownDocs {...pageProps} />
    </VersionsContext.Provider>
  );
}
