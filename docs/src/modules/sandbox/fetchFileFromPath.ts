import { Octokit } from '@octokit/rest';

export default async function fetchFileFromPath(filePath: string) {
  let owner = 'mui';
  let repo = 'mui-x';
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  // try using PR owners file when PR is detected
  if (process.env.PULL_REQUEST_ID) {
    try {
      const prInfo = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
        owner,
        repo,
        pull_number: Number(process.env.PULL_REQUEST_ID),
      });
      if (prInfo.data.head.repo) {
        owner = prInfo.data.head.repo.owner.login;
        repo = prInfo.data.head.repo?.name;
      }
    } catch (err) {
      console.error('Failed to resolve remote URL from PR:', err);
    }
  }
  const includesExtension = filePath.indexOf('.') > -1;
  if (includesExtension) {
    try {
      const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}{?ref}', {
        owner,
        repo,
        path: `docs/${filePath}`,
        ref: process.env.COMMIT_REF,
      });
      if (response.status === 200 && response.data.type === 'file') {
        return response.data;
      }
    } catch (err: any) {
      console.error(`Failed to fetch ${filePath} file:`, err);
    }
  } else {
    // if path does not include extension - we probably have an incomplete path
    // check path root/folder contents
    const pathWithoutLastSection = filePath.substring(0, filePath.lastIndexOf('/'));
    try {
      const rootResponse = await octokit.request(
        'GET /repos/{owner}/{repo}/contents/{path}{?ref}',
        {
          owner,
          repo,
          path: `docs/${pathWithoutLastSection}`,
          ref: process.env.COMMIT_REF,
        },
      );
      if (rootResponse.status === 200 && Array.isArray(rootResponse.data)) {
        // find the file, which includes the searched for path
        const foundFile = rootResponse.data.find((file) => file.path.includes(filePath));
        if (foundFile) {
          try {
            const fileResponse = await octokit.request(
              'GET /repos/{owner}/{repo}/contents/{path}{?ref}',
              {
                owner,
                repo,
                path: foundFile.path,
                ref: process.env.COMMIT_REF,
              },
            );
            if (fileResponse.status === 200) {
              return fileResponse.data;
            }
          } catch (fileFetchErr) {
            console.error(`Failed to fetch file: ${foundFile.path}:`, fileFetchErr);
          }
        }
      }
    } catch (innerErr) {
      console.error(`Failed to fetch path: ${pathWithoutLastSection}`);
    }
  }
  return null;
}
