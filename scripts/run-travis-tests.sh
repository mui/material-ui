#!/bin/bash
set -ev

npm run lint
npm run flow
npm run test:coverage
npm run test:karma
npm run test:regressions

if git log ${TRAVIS_COMMIT_RANGE} | grep -Ei '\[codemod\]'; then
  cd packages/material-ui-codemod && npm install && npm test
fi

cat ./test/coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
