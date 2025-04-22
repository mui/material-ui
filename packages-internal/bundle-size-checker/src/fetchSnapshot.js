/**
 *
 * @param {string} repo - The name of the repository e.g. 'mui/material-ui'
 * @param {string} sha - The commit SHA
 * @returns {Promise<import('./sizeDiff').SizeSnapshot | null>} - The size snapshot data
 */
export async function fetchSnapshot(repo, sha) {
  const url = `https://s3.eu-central-1.amazonaws.com/mui-org-ci/artifacts/${repo}/${sha}/size-snapshot.json`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch "${url}", HTTP ${response.status}`);
  }
  return response.json();
}
