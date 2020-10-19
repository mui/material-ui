// Only use built-in modules because this script runs pre-install.
const fs = require('fs');
const path = require('path');

function resolveVersion(packageName, distTag) {
  if (distTag.startsWith('csb:')) {
    const shortSha = distTag.replace(/^csb:/, '');
    return `https://pkg.csb.dev/mui-org/material-ui/commit/${shortSha}/${packageName}`;
  }
  return distTag;
}

// Object.fromEntries
function fromEntries(entries) {
  const obj = {};

  entries.forEach(([key, value]) => {
    obj[key] = value;
  });

  return obj;
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
  manifest.dependencies = fromEntries(
    Object.entries(manifest.dependencies).map(([packageName, distTag]) => {
      if (packageName.startsWith('@material-ui/')) {
        return [packageName, resolveVersion(packageName, muiDistTag)];
      }
      return [packageName, distTag];
    }),
  );
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

run({ distTag: process.argv[3], fixturePath: process.argv[2] }).catch((error) => {
  console.error(error);
  process.exit(1);
});
