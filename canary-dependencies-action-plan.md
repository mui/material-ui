# Canary Dependencies Testing GitHub Action Plan

This document outlines the implementation plan for a GitHub Action that runs on a schedule to test against different dependency versions.

## Overview

We'll implement this feature using two separate GitHub Actions workflows:

1. **Canary Update Workflow**:
   - Runs on a schedule (cron) or manual dispatch
   - Processes a matrix of dependency configurations
   - Finds or creates PRs for each dependency configuration
   - Updates dependencies and pushes changes to the PR branch

2. **Canary Notification Workflow**:
   - Triggers on CI check completion
   - Posts comments with results
   - Deletes and recreates comments when the status changes to ensure subscribers are notified

## Implementation Plan

### 1. Matrix Configuration

The update workflow will use a predefined matrix of dependency configurations, each with an ID and command:

```yaml
jobs:
  update-dependencies:
    runs-on: ubuntu-latest
    # Set a fixed base branch for all matrix items
    env:
      BASE_BRANCH: master
    strategy:
      fail-fast: false
      matrix:
        include:
          - id: react@18
            cmd: "pnpm -r update react@18"
          - id: react@next
            cmd: "pnpm -r update react@next"
          - id: typescript@next
            cmd: "pnpm -r update typescript@next"
```

### 2. PR Management

- Each configuration ID corresponds to a dedicated PR
- PRs are identified by a marker in the title: `[canary-dep: {id}]`
- If a PR doesn't exist, the workflow creates one
- The workflow always force-pushes to the PR branch with the latest changes
- All PRs use the same base branch (master)

### 3. How It Works

#### Update Workflow:

1. **Run matrix of configurations**:
   - For each matrix item, process the dependency update
   - All configurations are run on every workflow execution

2. **For each dependency configuration**:
   - Check if a PR with the marker `[canary-dep: {id}]` exists
   - If no PR exists:
     - Create a new branch from the base branch
     - Run the specified command
     - Create a PR with the appropriate title marker
   - If a PR exists:
     - Checkout the latest from the base branch
     - Create a temporary branch
     - Run the specified command
     - Force-push to the existing PR branch
   - Add a commit message with the marker `[canary] Update dependencies for PR #{number}`

#### Notification Workflow:

The notification workflow will remain the same as previously designed:

1. Triggers when a check run completes
2. Extracts the PR number directly from `check_run.pull_requests[0].number`
3. Checks if a comment from this bot already exists on the PR
4. If a comment exists and the status is the same, does nothing
5. If a comment exists and the status has changed, deletes the old comment
6. Creates a new comment with the current status

### 4. Implementation Details

<details>
<summary>Workflow Implementation Code</summary>

#### Canary Update Workflow

Create a file at `.github/workflows/canary-dependencies-update.yml`:

```yaml
name: Canary Dependencies Update

on:
  schedule:
    # Run daily at midnight UTC
    - cron: '0 0 * * *'
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  update-dependencies:
    runs-on: ubuntu-latest
    env:
      BASE_BRANCH: master
    strategy:
      fail-fast: false
      matrix:
        include:
          - id: react@18
            cmd: "pnpm -r update react@18"
          - id: react@next
            cmd: "pnpm -r update react@next"
          - id: typescript@next
            cmd: "pnpm -r update typescript@next"
    steps:
      - name: Process dependency update
        id: process
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const id = context.payload.matrix.id;
            const baseBranch = process.env.BASE_BRANCH;
            
            console.log(`Processing dependency update for ${id} using base branch: ${baseBranch}`);
            
            // Function to find existing PR
            async function findExistingPR() {
              const prMarker = `[canary-dep: ${id}]`;
              
              const { data: pulls } = await github.rest.pulls.list({
                owner: context.repo.owner,
                repo: context.repo.repo,
                state: 'open',
                base: baseBranch
              });
              
              return pulls.find(pr => pr.title.includes(prMarker));
            }
            
            // Find existing PR
            const existingPR = await findExistingPR();
            
            if (existingPR) {
              console.log(`Found existing PR #${existingPR.number} for ${id}`);
            } else {
              console.log(`No existing PR found for ${id}, will create one`);
            }
            
            // Save outputs for subsequent steps
            core.setOutput('pr_exists', !!existingPR);
            if (existingPR) {
              core.setOutput('pr_number', existingPR.number);
              core.setOutput('pr_branch', existingPR.head.ref);
            }
      
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          ref: ${{ env.BASE_BRANCH }}
      
      - name: Set up pnpm
        uses: pnpm/action-setup@v4
      
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      
      - name: Create or update branch
        run: |
          git config user.name "MUI Canary Bot"
          git config user.email "mui-org@users.noreply.github.com"
          
          # Create a new branch with a unique name
          BRANCH_NAME="canary-dep-${{ matrix.id }}-$(date +%s)"
          git checkout -b $BRANCH_NAME
          
          # Install dependencies and run the update command
          pnpm install
          ${{ matrix.cmd }}
          
          # Check if there are changes
          if [[ -z "$(git status --porcelain)" ]]; then
            echo "No changes detected"
            exit 0
          fi
          
          # Commit changes
          git add .
          git commit -m "[canary] Update dependencies for PR #${{ steps.process.outputs.pr_number || 'new' }}"
          
          # Output the branch name for the next step
          echo "BRANCH_NAME=$BRANCH_NAME" >> $GITHUB_ENV
      
      - name: Create PR if needed
        if: steps.process.outputs.pr_exists != 'true'
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const id = context.payload.matrix.id;
            const branchName = process.env.BRANCH_NAME;
            const baseBranch = process.env.BASE_BRANCH;
            
            // Create a new PR
            const { data: pr } = await github.rest.pulls.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `[canary-dep: ${id}] Test against ${id}`,
              head: branchName,
              base: baseBranch,
              body: `This PR automatically tests compatibility with ${id}.
              
              ## What is this?
              
              This is an automated PR that regularly updates to test against ${id}.
              The PR will be kept up-to-date by the canary dependencies workflow.
              
              ## Command
              
              \`\`\`
              ${{ matrix.cmd }}
              \`\`\`
              `
            });
            
            console.log(`Created PR #${pr.number}: ${pr.html_url}`);
            
            // Add canary label
            await github.rest.issues.addLabels({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: pr.number,
              labels: ['canary-dependency']
            });
            
            // Save the PR number for the notification workflow
            core.setOutput('pr_number', pr.number);
            core.setOutput('pr_branch', branchName);
      
      - name: Update existing PR
        if: steps.process.outputs.pr_exists == 'true'
        run: |
          # Force push to the existing PR branch
          git push --force origin $BRANCH_NAME:${{ steps.process.outputs.pr_branch }}
          echo "Updated PR #${{ steps.process.outputs.pr_number }}"
```

#### Canary Notification Workflow

Keep the existing notification workflow at `.github/workflows/canary-dependencies-notification.yml`:

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

## Initial Matrix Configuration

The initial matrix will include these dependency configurations:

1. **React 18**
   - ID: `react@18`
   - Command: `pnpm -r update react@18`

2. **React Next**
   - ID: `react@next`
   - Command: `pnpm -r update react@next`

3. **TypeScript Next**
   - ID: `typescript@next`
   - Command: `pnpm -r update typescript@next`

All configurations will use the fixed base branch "master" defined in the workflow's environment variables.