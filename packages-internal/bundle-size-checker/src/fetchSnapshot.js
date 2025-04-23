/**
 *
 * @param {string} repo - The name of the repository e.g. 'mui/material-ui'
 * @param {string} sha - The commit SHA
 * @returns {Promise<import('./sizeDiff').SizeSnapshot>} - The size snapshot data
 */
export async function fetchSnapshot(repo, sha) {
  const url = `https://s3.eu-central-1.amazonaws.com/mui-org-ci/artifacts/${repo}/${sha}/size-snapshot.json`;
  const response = await fetch(url);
  if (!response.ok) {
    if (repo === 'mui/material-ui') {
      const legacyUrl = `https://s3.eu-central-1.amazonaws.com/mui-org-ci/artifacts/master/${sha}/size-snapshot.json`;
      const legacyResponse = await fetch(legacyUrl);
      if (legacyResponse.ok) {
        return legacyResponse.json();
      }
    }
    throw new Error(`Failed to fetch "${url}", HTTP ${response.status}`);
  }
  return response.json();
}
