#!/bin/sh
# Builds the workspace packages once per checkout, so repeated runs on the same tree skip the build.
set -e
marker=node_modules/.cache/benchmark-built
if [ -f "$marker" ]; then
  exit 0
fi
pnpm release:build
mkdir -p node_modules/.cache
touch "$marker"
