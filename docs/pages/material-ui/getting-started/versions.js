import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import VersionsContext from 'docs/pages/material-ui/getting-started/VersionsContext';
import { generateVersions } from '@mui/internal-core-docs/utils';
import * as pageProps from 'docs/data/material/getting-started/versions/versions.md?muiMarkdown';

export default function Page(props) {
  const { versions } = props;
  return (
    <VersionsContext.Provider value={versions}>
      <MarkdownDocs {...pageProps} />
    </VersionsContext.Provider>
  );
}

export async function getStaticProps() {
  const versions = await generateVersions();
  return { props: { versions } };
}
