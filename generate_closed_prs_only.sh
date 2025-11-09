#!/bin/bash
set -euo pipefail

echo "🏗️  Creating 10 closed PRs (3 reusing existing open PRs)..."

# Detect repo
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
BASE_BRANCH=$(git symbolic-ref --short refs/remotes/origin/HEAD | cut -d'/' -f2)

echo "📦 Repo: $REPO"
echo "🌿 Base branch: $BASE_BRANCH"

# Get open PR branches
mapfile -t OPEN_BRANCHES < <(gh pr list --state open --json headRefName -q '.[].headRefName')
if ((${#OPEN_BRANCHES[@]} == 0)); then
  echo "❌ No open PR branches found — aborting."
  exit 1
fi

# Pick 3 random open branches
mapfile -t REUSED_BRANCHES < <(printf "%s\n" "${OPEN_BRANCHES[@]}" | shuf -n 3)

echo "♻️  Will reuse these open PR branches for closed PRs:"
printf '   - %s\n' "${REUSED_BRANCHES[@]}"

# Create 7 brand-new branches
for i in {1..7}; do
  BRANCH="closed-$(date +%s)-$i"
  echo "🚀 Creating closed PR branch: $BRANCH"
  git checkout "$BASE_BRANCH" >/dev/null 2>&1
  git pull origin "$BASE_BRANCH" >/dev/null 2>&1
  git checkout -b "$BRANCH"
  echo "Closed PR test file $i" > "closed_pr_$i.txt"
  git add "closed_pr_$i.txt"
  git commit -m "Add closed PR test file $i"
  git push -u origin "$BRANCH"
  echo "🔧 Creating draft PR for $BRANCH → $BASE_BRANCH"
  gh pr create --title "Closed PR $i" --body "Auto-generated closed PR $i" --base "$BASE_BRANCH" --head "$BRANCH" --draft
done

# Immediately close the 7 new PRs
for BRANCH in $(gh pr list --state open --json headRefName -q '.[].headRefName' | grep "closed-" || true); do
  PR_NUMBER=$(gh pr list --state open --json headRefName,number -q ".[] | select(.headRefName==\"$BRANCH\") | .number")
  if [ -n "$PR_NUMBER" ]; then
    echo "❌ Closing PR #$PR_NUMBER ($BRANCH)..."
    gh pr close "$PR_NUMBER" --delete-branch || true
  fi
done

# Reuse 3 existing open branches to create and close PRs
for BRANCH in "${REUSED_BRANCHES[@]}"; do
  echo "♻️  Reusing $BRANCH for a closed PR"
  gh pr create --title "Closed (Reused) $BRANCH" --body "Closed PR reusing open branch $BRANCH" --base "$BASE_BRANCH" --head "$BRANCH" --draft || true
  PR_NUMBER=$(gh pr list --state open --json headRefName,number -q ".[] | select(.headRefName==\"$BRANCH\") | .number")
  if [ -n "$PR_NUMBER" ]; then
    echo "❌ Closing reused PR #$PR_NUMBER ($BRANCH)..."
    gh pr close "$PR_NUMBER" || true
  fi
done

echo "✅ Done! Created 10 closed PRs (3 reused, 7 new)."

