#!/bin/bash
set -ev

npm run lint
npm run flow
npm run test:coverage
npm run test:karma
npm run build:docs
DOCKER_TEST_URL=http://$(ip addr show docker0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1):3090 npm run test:regressions

if git log ${TRAVIS_COMMIT_RANGE} | grep -Ei '\[codemod\]'; then
  cd packages/material-ui-codemod && npm install && npm test
fi
