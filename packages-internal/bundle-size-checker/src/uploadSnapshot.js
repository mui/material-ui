import fs from 'fs';
import { S3Client, PutObjectCommand, PutObjectTaggingCommand } from '@aws-sdk/client-s3';
import { execa } from 'execa';
import { fromEnv } from '@aws-sdk/credential-providers';

/**
 * Gets the current Git branch name
 * @returns {Promise<string>} The current branch name
 */
async function getCurrentBranch() {
  try {
    const { stdout } = await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
    return stdout.trim();
  } catch (/** @type {any} */ error) {
    console.warn('Failed to determine Git branch:', error);
    return 'unknown-branch';
  }
}

/**
 * Gets the current Git commit SHA
 * @returns {Promise<string>} The current commit SHA
 */
async function getCurrentCommitSHA() {
  const { stdout } = await execa('git', ['rev-parse', 'HEAD']);
  return stdout.trim();
}

/**
 * Uploads the size snapshot to S3
 * @param {string} snapshotPath - The path to the size snapshot JSON file
 * @param {UploadConfig} uploadConfig - The upload configuration
 * @param {string} [commitSha] - Optional commit SHA (defaults to current Git HEAD)
 * @returns {Promise<{key:string}>}
 */
export async function uploadSnapshot(snapshotPath, uploadConfig, commitSha) {
  if (!uploadConfig || !uploadConfig.project) {
    throw new Error('Upload configuration is missing or invalid');
  }

  // Run git operations and file reading in parallel
  const [sha, branch, fileContent] = await Promise.all([
    // Get the current commit SHA if not provided
    commitSha || getCurrentCommitSHA(),
    // Get branch name if not provided
    uploadConfig.branch || getCurrentBranch(),
    // Read the snapshot file
    fs.promises.readFile(snapshotPath),
  ]);

  // Default isPullRequest is false
  const isPullRequest = uploadConfig.isPullRequest || false;

  // Create S3 client (uses AWS credentials from environment)
  const client = new S3Client({
    region: process.env.AWS_REGION_ARTIFACTS || process.env.AWS_REGION || 'eu-central-1',
    credentials: fromEnv(),
  });

  // S3 bucket and key
  const bucket = 'mui-org-ci';
  const key = `artifacts/${uploadConfig.project}/${sha}/size-snapshot.json`;

  // Upload the file first
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: fileContent,
      ContentType: 'application/json',
    }),
  );

  // Then add tags to the uploaded object
  await client.send(
    new PutObjectTaggingCommand({
      Bucket: bucket,
      Key: key,
      Tagging: {
        TagSet: [
          { Key: 'isPullRequest', Value: isPullRequest ? 'yes' : 'no' },
          { Key: 'branch', Value: branch },
        ],
      },
    }),
  );

  return { key };
}
