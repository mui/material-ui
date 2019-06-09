/* eslint-disable no-console */
const aws = require('aws-sdk');
const fse = require('fs-extra');
const path = require('path');

const workspaceRoot = path.join(__dirname, '../../');
const snapshotDestPath = path.join(workspaceRoot, 'size-snapshot.json');

async function main() {
  function uploadArtifact(artifact, options) {
    return new Promise(async (resolve, reject) => {
      const s3 = new aws.S3();

      s3.upload(
        {
          ...options,
          Body: JSON.stringify(artifact, null, 2),
          ContentType: 'application/json',
        },
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        },
      );
    });
  }

  const branch = process.env.BUILD_SOURCEBRANCHNAME.replace(/^refs\/head\//, '');

  const snapshot = await fse.readJSON(snapshotDestPath);

  function upload(revision) {
    const uploadOptions = {
      Bucket: 'eps1lon-material-ui',
      Key: `artifacts/${branch}/${revision}/size-snapshot.json`,
    };
    return uploadArtifact(snapshot, uploadOptions);
  }

  // save snapshot under the commit id as well as imitating a symlink `latest`
  // to the commit id
  const [uploaded] = await Promise.all([upload(process.env.BUILD_SOURCEVERSION), upload('latest')]);
  console.log(uploaded);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
