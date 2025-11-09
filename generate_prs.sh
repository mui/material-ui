#!/usr/bin/env bash
set -euo pipefail

# Base branch
BASE_BRANCH="master"

# Number of open/closed PRs
OPEN_COUNT=15
CLOSED_COUNT=10

echo "🏗️  Setting up $OPEN_COUNT open PRs and $CLOSED_COUNT closed PRs..."
cd material-ui-copy-testing

# Ensure we start clean
git checkout $BASE_BRANCH
git pull origin $BASE_BRANCH

# Step 1: Create open PRs
for i in $(seq 1 $OPEN_COUNT); do
  BRANCH="open-pr-$i"
  echo "📦 Creating branch: $BRANCH"
  git checkout -b "$BRANCH"
  echo "This is test open PR $i" > "open_pr_$i.txt"
  git add "open_pr_$i.txt"
  git commit -m "Add open PR $i file"
  git push origin "$BRANCH"

  gh pr create --title "Open PR $i" \
    --body "This is automatically generated open PR #$i" \
    --base "$BASE_BRANCH" \
    --head "$BRANCH" \
    --draft >/dev/null
done

# Step 2: Create closed PRs (simulate shared branches)
for i in $(seq 1 $CLOSED_COUNT); do
  if (( i <= 3 )); then
    # Reuse 3 branches from open PRs
    BRANCH="open-pr-$i"
    echo "♻️  Creating closed PR using shared branch: $BRANCH"
  else
    BRANCH="closed-pr-$i"
    echo "📦 Creating new closed PR branch: $BRANCH"
    git checkout -b "$BRANCH"
    echo "This is test closed PR $i" > "closed_pr_$i.txt"
    git add "closed_pr_$i.txt"
    git commit -m "Add closed PR $i file"
    git push origin "$BRANCH"
  fi

  # Create the PR
  PR_URL=$(gh pr create --title "Closed PR $i" \
    --body "Automatically generated closed PR #$i" \
    --base "$BASE_BRANCH" \
    --head "$BRANCH" \
    --draft -q)

  # Extract PR number
  PR_NUMBER=$(basename "$PR_URL")

  echo "🔒 Closing PR #$PR_NUMBER ($BRANCH)"
  gh pr close "$PR_NUMBER" --delete-branch=false >/dev/null || true
done

echo "✅ Done! $(gh pr list --state all | wc -l) total PRs exist now."

