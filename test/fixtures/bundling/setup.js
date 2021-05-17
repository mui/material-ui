// Only use built-in modules because this script runs pre-install.
const fs = require('fs');
const path = require('path');

function resolveVersion(packageName, distTag) {
  if (distTag.startsWith('csb:')) {
    const shortSha = distTag.replace(/^csb:/, '').slice(0, 8);
    return `https://pkg.csb.dev/mui-org/material-ui/commit/${shortSha}/${packageName}`;
  }
  return distTag;
}

async function run(context) {
  const { distTag: muiDistTag, fixturePath } = context;
  if (muiDistTag === undefined || fixturePath === undefined) {
    throw new Error(
      `Usage: ${path.basename(
        process.argv[1],
      )} <fixturePath> <distTag>\n  distTag: An npm tag e.g. 'next' or 'latest' or a codesandbox deploy e.g. 'csb:7839b1e2' where '7839b1e2' is the commit SHA.`,
    );
  }

  const manifestPath = path.resolve(fixturePath, './package.json');
  const manifestContent = fs.readFileSync(manifestPath, { encoding: 'utf8' });
  const manifest = JSON.parse(manifestContent);
  manifest.resolutions = manifest.resolutions || {};
  Object.keys(manifest.dependencies).forEach((packageName) => {
    if (packageName.startsWith('@material-ui/')) {
      manifest.dependencies[packageName] = resolveVersion(packageName, muiDistTag);
      manifest.resolutions[packageName] = resolveVersion(packageName, muiDistTag);
    }
  });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

run({ distTag: process.argv[3], fixturePath: process.argv[2] }).catch((error) => {
  console.error(error);
  process.exit(1);
});
