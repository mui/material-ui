# Canary Dependencies Testing GitHub Action Plan

This document outlines the implementation plan for a GitHub Action that runs on pull requests with a [canary] tag to test against different dependency versions.

## Overview

We'll implement this feature using two separate GitHub Actions workflows:

1. **Canary Update Workflow**:

   - Triggers on PRs with the [canary] tag and daily cron
   - Processes each PR by running the command in their config file
   - Commits and pushes changes

2. **Canary Notification Workflow**:
   - Triggers on CI check completion
   - Posts comments with results
   - Deletes and recreates comments when the status changes to ensure subscribers are notified

## Implementation Plan

### 1. Configuration File Structure

Each PR with a canary tag should include a config file at `canary/<PR-number>.json` within the PR branch:

```json
{
  "run": "pnpm -r update react@next"
}
```

This file:

- Contains the command to run (e.g., `pnpm -r update typescript@next`)
- Exists only in the PR branch (not merged to main)
- Is preserved when the action updates the PR

### 2. How It Works

#### Update Workflow:

1. **First job (find-canary-prs)**:

   - For PR events: Pass through if the PR has the "canary" label
   - For scheduled/manual events: Use the issues API to find all open PRs with the canary label
   - Outputs a list of PR numbers to process

2. **Second job (process-pr)**:
   - Uses a matrix strategy to process each PR in parallel
   - For each PR:
     1. Checks out that specific PR
     2. Loads the config file from the PR branch
     3. Creates a clean branch based on the base branch
     4. Restores the config file
     5. Runs the specified command
     6. Commits and force pushes changes to the PR branch

#### Notification Workflow:

1. Triggers when a check run completes
2. Extracts the PR number directly from `check_run.pull_requests[0].number`
3. Checks if a comment from this bot already exists on the PR
4. If a comment exists and the status is the same, does nothing
5. If a comment exists and the status has changed, deletes the old comment
6. Creates a new comment with the current status

### 3. Example Usage

1. Create a PR with desired changes
2. Add the "canary" label
3. Include a config file in the PR at `canary/<PR-number>.json`:
   ```json
   {
     "run": "pnpm -r update react@next"
   }
   ```
4. The update workflow will run automatically when:

   - The PR is created or updated
   - The daily cron job runs
   - The workflow is manually triggered

5. The notification workflow will run when the CI check completes
6. If the CI status has changed since the last run, it will post a new comment

This implementation:

- Uses the Issues API for better PR filtering
- Leverages check_run events for more accurate notification timing
- Extracts PR number directly from the check run data
- Keeps the config file within the PR only
- Ensures clean environment for dependency testing
- Preserves the CI status in a hidden HTML comment marker
- Deletes and recreates comments when the status changes to trigger notifications

### 4. Implementation Details

<details>
<summary>Workflow Implementation Code</summary>

#### Canary Update Workflow

Create a file at `.github/workflows/canary-dependencies-update.yml`:

```yaml
name: Canary Dependencies Update

on:
  pull_request:
    types: [opened, reopened, labeled, synchronize]
  schedule:
    # Run daily at midnight UTC
    - cron: '0 0 * * *'
  workflow_dispatch:
    # Allow manual triggering with optional PR number
    inputs:
      pr_number:
        description: 'PR number to process (must have canary label)'
        required: false
        type: number

permissions:
  contents: write
  pull-requests: read

jobs:
  find-canary-prs:
    runs-on: ubuntu-latest
    outputs:
      pr_numbers: ${{ steps.get-prs.outputs.result }}
    steps:
      - name: Find PRs with canary tag
        id: get-prs
        uses: actions/github-script@v7
        with:
          script: |
            // For PR events
            if (context.eventName === 'pull_request') {
              // Check if PR has canary label
              const hasCanaryLabel = context.payload.pull_request.labels.some(
                label => label.name === 'canary'
              );
              
              if (hasCanaryLabel) {
                return [context.payload.pull_request.number];
              }
              return [];
            } 
            // For scheduled or manual runs - find all PRs with canary label
            else if (context.eventName === 'schedule' || context.eventName === 'workflow_dispatch') {
              // Use the issues API to find all open issues with the canary label
              const { data: issues } = await github.rest.issues.listForRepo({
                owner: context.repo.owner,
                repo: context.repo.repo,
                state: 'open',
                labels: 'canary'
              });
              
              // Filter for pull requests only
              let prNumbers = issues
                .filter(issue => issue.pull_request)
                .map(issue => issue.number);
              
              // For manual workflow run with specific PR number
              if (context.eventName === 'workflow_dispatch' && context.payload.inputs?.pr_number) {
                const manualPrNumber = Number(context.payload.inputs.pr_number);
                
                // Check if the provided PR number has the canary label (is in our filtered list)
                if (prNumbers.includes(manualPrNumber)) {
                  // Only process this specific PR
                  return [manualPrNumber];
                } else {
                  console.log(`PR #${manualPrNumber} does not have the canary label, skipping`);
                  return [];
                }
              }
              
              return prNumbers;
            }

            return [];

  process-pr:
    needs: find-canary-prs
    if: needs.find-canary-prs.outputs.pr_numbers != '[]'
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        pr: ${{ fromJson(needs.find-canary-prs.outputs.pr_numbers) }}
    steps:
      - name: Checkout PR
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          ref: ${{ format('refs/pull/{0}/head', matrix.pr) }}

      - name: Set up pnpm
        uses: pnpm/action-setup@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Process PR ${{ matrix.pr }}
        id: process-pr
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const path = require('path');
            const { exec } = require('child_process');
            const util = require('util');
            const execAsync = util.promisify(exec);

            // Function to execute shell commands
            async function runCommand(command, ignoreError = false) {
              try {
                console.log(`Running command: ${command}`);
                const { stdout, stderr } = await execAsync(command);
                console.log(stdout);
                if (stderr) console.error(stderr);
                return { success: true, stdout, stderr };
              } catch (error) {
                console.error(`Command failed: ${error.message}`);
                if (!ignoreError) {
                  throw error;
                }
                return { success: false, error: error.message };
              }
            }

            // Function to setup git
            async function setupGit() {
              await runCommand('git config user.name "MUI Canary Bot"');
              await runCommand('git config user.email "mui-org@users.noreply.github.com"');
            }

            // Function to load config file
            function loadConfig(prNumber) {
              const configPath = path.join(process.cwd(), 'canary', `${prNumber}.json`);
              
              if (!fs.existsSync(configPath)) {
                console.log(`Config file not found: ${configPath}`);
                return null;
              }
              
              try {
                const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                
                // Validate required fields
                if (!config.run) {
                  console.log('Missing required "run" field in config');
                  return null;
                }
                
                return config;
              } catch (error) {
                console.error(`Error parsing config: ${error.message}`);
                return null;
              }
            }

            // Function to check if there are changes to commit
            async function hasChangesToCommit() {
              try {
                // Check for unstaged changes
                await execAsync('git diff --quiet');
                // No changes
                return false;
              } catch (error) {
                // Changes exist
                return true;
              }
            }

            // Function to get PR details
            async function getPRDetails(prNumber) {
              try {
                const { data: pullRequest } = await github.rest.pulls.get({
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  pull_number: prNumber
                });
                
                return {
                  branchName: pullRequest.head.ref,
                  headSha: pullRequest.head.sha,
                  baseBranch: pullRequest.base.ref
                };
              } catch (error) {
                console.error(`Error getting PR details: ${error.message}`);
                return null;
              }
            }

            // Main function to process a PR
            async function processPR(prNumber) {
              console.log(`Processing PR #${prNumber}`);
              
              // Get PR details
              const prDetails = await getPRDetails(prNumber);
              if (!prDetails) {
                console.error(`Could not get details for PR #${prNumber}`);
                return false;
              }
              
              // Setup git
              await setupGit();
              
              // Load config from the PR branch
              const config = loadConfig(prNumber);
              if (!config) {
                console.log(`No valid config found for PR #${prNumber}`);
                return false;
              }
              
              // Determine the base branch and create a clean working branch
              console.log(`Preparing clean base branch while preserving config file`);
              
              // Save the config file content
              const configPath = path.join(process.cwd(), 'canary', `${prNumber}.json`);
              const configContent = fs.readFileSync(configPath, 'utf8');
              
              // Fetch the base branch
              await runCommand(`git fetch origin ${prDetails.baseBranch}`);
              
              // Create a new branch based on the base branch
              const tempBranchName = `canary-update-${prNumber}`;
              await runCommand(`git checkout -b ${tempBranchName} origin/${prDetails.baseBranch}`);
              
              // Create canary directory if it doesn't exist
              if (!fs.existsSync('canary')) {
                fs.mkdirSync('canary', { recursive: true });
              }
              
              // Restore the config file
              fs.writeFileSync(configPath, configContent);
              
              // Install dependencies first
              await runCommand('pnpm install');
              
              // Run the command from config
              await runCommand(config.run);
              
              // Stage the config file to ensure it's preserved
              await runCommand(`git add ${configPath}`);
              
              // Stage any other changes
              await runCommand('git add .');
              
              // Check for changes
              const hasChanges = await hasChangesToCommit();
              if (!hasChanges) {
                console.log(`No changes detected for PR #${prNumber}`);
                return false;
              }
              
              // Commit
              await runCommand(`git commit -m "[canary] Update dependencies for PR #${prNumber}"`);
              
              // Push to the PR branch (using the temp branch name as source)
              await runCommand(`git push --force origin ${tempBranchName}:refs/heads/${prDetails.branchName}`);
              
              console.log(`Successfully pushed changes to PR #${prNumber}`);
              return true;
            }

            // Process the PR from the matrix
            const result = await processPR(${{ matrix.pr }});
            return result;
```

#### Canary Notification Workflow

Create a file at `.github/workflows/canary-dependencies-notification.yml`:

```yaml
name: Canary Dependencies Notification

on:
  check_run:
    types: [completed]

permissions:
  pull-requests: write

jobs:
  notify:
    runs-on: ubuntu-latest
    if: |
      contains(github.event.check_run.head_commit.message, '[canary] Update dependencies for PR #') && 
      (github.event.check_run.name == 'CI' || contains(github.event.check_run.name, 'ci'))
    steps:
      - name: Extract PR number and post notification
        uses: actions/github-script@v7
        with:
          script: |
            // Extract PR number directly from the pull request data
            const prNumber = context.payload.check_run.pull_requests[0]?.number;

            if (!prNumber) {
              console.log('Could not find PR number for this check run');
              return;
            }

            console.log(`Processing notification for PR #${prNumber}`);

            // Unique HTML comment marker to identify this bot's comments
            const COMMENT_MARKER = '<!-- MUI-CANARY-BOT-COMMENT -->';
            // Status marker to track the CI status in the comment
            const STATUS_MARKER_PREFIX = '<!-- MUI-CANARY-STATUS: ';
            const STATUS_MARKER_SUFFIX = ' -->';

            // Get CI result
            const ciStatus = context.payload.check_run.conclusion;

            // Create status marker
            const statusMarker = `${STATUS_MARKER_PREFIX}${ciStatus}${STATUS_MARKER_SUFFIX}`;

            // Create comment body based on CI status
            let commentBody = '';

            if (ciStatus === 'success') {
              commentBody = `## ✅ Canary Test Passed\n\nThe canary test has completed successfully. Dependencies were updated and all CI checks passed.\n\n${statusMarker}`;
            } else if (ciStatus === 'failure') {
              const checkUrl = context.payload.check_run.html_url;
              commentBody = `## ❌ Canary Test Failed\n\nThe canary test has failed. Dependencies were updated but CI checks failed. [View CI details](${checkUrl}).\n\n${statusMarker}`;
            } else {
              commentBody = `## ⚠️ Canary Test Result: ${ciStatus}\n\nThe canary test completed with status: ${ciStatus}. [View CI details](${context.payload.check_run.html_url}).\n\n${statusMarker}`;
            }

            // Add the bot marker to the comment body
            commentBody = `${commentBody}\n\n${COMMENT_MARKER}`;

            // Find existing comments
            const { data: comments } = await github.rest.issues.listComments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: prNumber
            });

            // Look for our marker in existing comments
            const botComment = comments.find(comment => 
              comment.body.includes(COMMENT_MARKER)
            );

            // If a comment exists, check if the status is the same
            if (botComment) {
              const statusMatch = botComment.body.match(
                new RegExp(`${STATUS_MARKER_PREFIX}(.+?)${STATUS_MARKER_SUFFIX}`)
              );
              
              const existingStatus = statusMatch ? statusMatch[1] : null;
              
              if (existingStatus === ciStatus) {
                // Status is the same, do nothing to avoid unnecessary notifications
                console.log(`Status unchanged (${ciStatus}), keeping existing comment`);
                return;
              }
              
              // Status changed, delete the existing comment
              console.log(`Status changed from ${existingStatus} to ${ciStatus}, replacing comment`);
              await github.rest.issues.deleteComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                comment_id: botComment.id
              });
            }

            // Create a new comment
            const { data: newComment } = await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: prNumber,
              body: commentBody
            });

            console.log(`Created comment #${newComment.id} with status: ${ciStatus}`);
```

</details>