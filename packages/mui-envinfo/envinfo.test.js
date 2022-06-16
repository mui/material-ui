const { expect } = require('chai');
const { execFileSync } = require('child_process');
const path = require('path');
const clipboard = require('clipboardy');

const isRunningOnWindows = process.platform === 'win32';

describe('@mui/envinfo', () => {
  const packagePath = __dirname;
  let isClipboardAvailable = true;

  before(function testClipboardAvailability() {
    try {
      clipboard.writeSync('');
    } catch (e) {
      isClipboardAvailable = false;
    }
  });

  // eslint-disable-next-line mocha/no-sibling-hooks
  before(function beforeHook() {
    // only run in node
    if (!/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    // clear clipboard
    if (isClipboardAvailable) {
      clipboard.writeSync('');
    }

    // Building might take some time
    this.timeout(10000);
    execFileSync(isRunningOnWindows ? 'yarn.cmd' : 'yarn', ['build'], {
      cwd: packagePath,
      stdio: 'pipe',
    });
  });

  afterEach(function clearClipboardAfterEach() {
    if (isClipboardAvailable) {
      // clear clipboard
      clipboard.writeSync('');
    }
  });

  function execEnvinfo(args = []) {
    const buildPath = path.resolve(packagePath, 'build');
    return execFileSync(
      isRunningOnWindows ? 'npx.cmd' : 'npx',
      ['--package', buildPath, 'envinfo', ...args],
      {
        encoding: 'utf-8',
        stdio: 'pipe',
      },
    );
  }

  it('includes info about the environment relevant to MUI', function test() {
    // Need more time to download packages
    this.timeout(10000);

    const envinfoJSON = execEnvinfo(['--json', '--skipClipboard']);

    const envinfo = JSON.parse(envinfoJSON);

    // chai doesn't have expect.any(String) like jest, so we have to use what's available
    // We basically want to test like https://github.com/eps1lon/testing-library-envinfo/blob/2543092f4e4af02d79e306ec6546a9c12b258675/index.test.js#L20-L68
    // The specific versions change over time so we can't use snapshots.
    expect(envinfo).to.have.nested.property('Binaries.Node');
    expect(envinfo).to.have.nested.property('Binaries.Yarn');
    expect(envinfo).to.have.nested.property('Binaries.npm');
    // CI doesn't install all the covered browsers. Simply asserting that it does print browsers.
    expect(envinfo).to.have.nested.property('Browsers');
    expect(envinfo).to.have.nested.property('npmPackages.@emotion/react');
    expect(envinfo).to.have.nested.property('npmPackages.@emotion/styled');
    // Non-exhaustive list of `@mui/*` packages
    expect(envinfo).to.have.nested.property('npmPackages.@mui/material');
    expect(envinfo).to.have.nested.property('npmPackages.@mui/lab');
    expect(envinfo).to.have.nested.property('npmPackages.react');
    expect(envinfo).to.have.nested.property('npmPackages.react-dom');
    expect(envinfo).to.have.nested.property('npmPackages.styled-components');
    expect(envinfo).to.have.nested.property('npmPackages.typescript');
  });

  it('copies env information to the clipboard', function test() {
    if (!isClipboardAvailable) {
      this.skip();
    }

    // Need more time to download packages
    this.timeout(10000);

    const info = 'Output copied to clipboard';

    const consoleOutput = execEnvinfo();
    const envFromClipboard = clipboard.readSync();

    expect(consoleOutput).to.include(info);
    expect(consoleOutput).to.include(envFromClipboard);

    expect(envFromClipboard).to.include('@mui/material');
    expect(envFromClipboard).to.include('typescript');
    expect(envFromClipboard).to.not.include(info);
  });

  it("doesn't copy to clipboard with --skipClipboard flag", function test() {
    if (!isClipboardAvailable) {
      this.skip();
    }

    // Need more time to download packages
    this.timeout(10000);

    const info = 'Output copied to clipboard';

    const consoleOutput = execEnvinfo(['--skipClipboard']);
    const envFromClipboard = clipboard.readSync();

    expect(consoleOutput).to.not.include(info);
    expect(envFromClipboard).to.be.equal('');
  });

  it('when copy to clipboard fails, adds error message at the end', function test() {
    if (isClipboardAvailable) {
      this.skip();
    }

    const consoleOutput = execEnvinfo().toLocaleLowerCase();

    expect(consoleOutput).to.include('failed to copy to clipboard');
  });
});
