const { execFileSync } = require('child_process');
const path = require('path');
const { expect } = require('chai');

describe('@mui/envinfo', () => {
  const packagePath = __dirname;
  const testProjectPath = path.resolve(packagePath, 'test');

  function execEnvinfo(args) {
    const envinfoPath = path.resolve(packagePath, 'envinfo.js');
    return execFileSync('node', [envinfoPath, ...args], {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: testProjectPath,
    });
  }

  it('includes info about the environment relevant to MUI', function test() {
    // only run in node
    if (!/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const envinfoJSON = execEnvinfo(['--json']);

    const envinfo = JSON.parse(envinfoJSON);

    // chai doesn't have expect.any(String) like jest so we have to use what's available
    // We basically want to test like https://github.com/eps1lon/testing-library-envinfo/blob/2543092f4e4af02d79e306ec6546a9c12b258675/index.test.js#L20-L68
    // The specific versions change over time so we can't use snapshots.
    expect(envinfo).to.have.nested.property('Binaries.Node');
    expect(envinfo).to.have.nested.property('Binaries.pnpm');
    expect(envinfo).to.have.nested.property('Binaries.npm');
    // CI doesn't install all the covered browsers. Simply asserting that it does print browsers.
    expect(envinfo).to.have.nested.property('Browsers');
    // Non-exhaustive list of `@mui/*` packages
    expect(envinfo).to.have.nested.property('npmPackages.@mui/material');
    expect(envinfo).to.have.nested.property('npmPackages.@mui/joy');
    expect(envinfo).to.have.nested.property('npmPackages.@mui/base');
    // Other libraries
    expect(envinfo).to.have.nested.property('npmPackages.react');
    expect(envinfo).to.have.nested.property('npmPackages.react-dom');

    // TODO: remove this check once React 19 stable types are released
    // React 19 RC requires setting `@types/react' to `npm:types-react@19.0.0-rc.1`
    // See https://react.dev/blog/2024/04/25/react-19-upgrade-guide#installing
    if (process.env.REACT_VERSION === 'next') {
      expect(envinfo).to.have.nested.property('npmPackages.@types/react');
    } else {
      expect(envinfo).to.have.nested.property('npmPackages.types-react');
    }

    expect(envinfo).to.have.nested.property('npmPackages.@emotion/react');
    expect(envinfo).to.have.nested.property('npmPackages.@emotion/styled');
  });
});
