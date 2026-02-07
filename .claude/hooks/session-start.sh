#!/bin/bash
set -euo pipefail

# Only run in remote (cloud) environment
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install dependencies using yarn (monorepo with workspaces)
yarn install

# Node v22 auto-detects ESM from import syntax, which bypasses @babel/register
# used by mocha tests. Disable this so tests can run.
echo 'export NODE_OPTIONS="--no-experimental-detect-module"' >> "$CLAUDE_ENV_FILE"
