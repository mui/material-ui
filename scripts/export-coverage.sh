#!/bin/bash
set -ev

if [ ! -z "${COVERALLS_REPO_TOKEN}" ]; then
  cat ./test/coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
fi
