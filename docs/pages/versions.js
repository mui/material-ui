import * as React from 'react';
import sortedUniqBy from 'lodash/sortedUniqBy';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import VersionsContext from 'docs/src/pages/versions/VersionsContext';
import * as pageProps from 'docs/src/pages/versions/versions.md?muiMarkdown';

export default function Page(props) {
  const { versions } = props;
  return (
    <VersionsContext.Provider value={versions}>
      <MarkdownDocs {...pageProps} />
    </VersionsContext.Provider>
  );
}

function formatVersion(version) {
  return version
    .replace('v', '')
    .split('.')
    .map((n) => +n + 1000)
    .join('.');
}

async function getBranches() {
  const result = await fetch('https://api.github.com/repos/mui/material-ui-docs/branches', {
    headers: {
      Authorization: process.env.GITHUB_AUTH,
    },
  });
  const text = await result.text();

  if (result.status !== 200) {
    throw new Error(text);
  }

  return JSON.parse(text);
}

Page.getInitialProps = async () => {
  const FILTERED_BRANCHES = ['latest', 'l10n', 'next', 'migration', 'material-ui.com'];

  const branches = await getBranches();
  /**
   * @type {import('docs/src/pages/versions/VersionsContext').VersionsContextValue}
   */
  const versions = [];
  branches.forEach((branch) => {
    if (!FILTERED_BRANCHES.includes(branch.name)) {
      const version = branch.name;
      versions.push({
        version,
        // Replace dot with dashes for Netlify branch subdomains
        url: `https://${version.replace(/\./g, '-')}.mui.com`,
      });
    }
  });
  // Current version.
  versions.push({
    version: `v${process.env.LIB_VERSION}`,
    url: 'https://mui.com',
  });
  // Legacy documentation.
  versions.push({
    version: 'v0',
    url: 'https://v0.mui.com',
  });
  versions.sort((a, b) => formatVersion(b.version).localeCompare(formatVersion(a.version)));

  if (
    branches.find((branch) => branch.name === 'next') &&
    !versions.find((version) => /beta|alpha/.test(version.version))
  ) {
    versions.unshift({
      version: `v${Number(versions[0].version[1]) + 1} pre-release`,
      url: 'https://next.mui.com',
    });
  }

  return { versions: sortedUniqBy(versions, 'version') };
};
