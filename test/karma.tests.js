/* eslint-env mocha */
import './utils/init';
import { createMochaHooks } from './utils/mochaHooks';

const mochaHooks = createMochaHooks(window.Mocha);

before(function beforeAllHook() {
  mochaHooks.beforeAll.forEach((mochaHook) => {
    mochaHook.call(this);
  });
});

after(function afterAllHook() {
  mochaHooks.afterAll.forEach((mochaHook) => {
    mochaHook.call(this);
  });
});

beforeEach(function beforeEachHook() {
  mochaHooks.beforeEach.forEach((mochaHook) => {
    mochaHook.call(this);
  });
});

afterEach(function afterEachHook() {
  mochaHooks.afterEach.forEach((mochaHook) => {
    mochaHook.call(this);
  });
});

const integrationContext = require.context(
  '../packages/material-ui/test/integration',
  true,
  /\.test\.(js|ts|tsx)$/,
);
integrationContext.keys().forEach(integrationContext);

const coreUnitContext = require.context(
  '../packages/material-ui/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
coreUnitContext.keys().forEach(coreUnitContext);

const labUnitContext = require.context(
  '../packages/material-ui-lab/src/',
  true,
  /\.test\.(js|ts|tsx)$/,
);
labUnitContext.keys().forEach(labUnitContext);
