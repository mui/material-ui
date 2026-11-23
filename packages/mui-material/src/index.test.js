/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { describe, it, expect } from 'vitest';
import * as MaterialUI from './index';

// To skip them in the undefined exports test
// These are checked in the build process (scripts/build.mjs)
const versionExports = ['version', 'major', 'minor', 'patch', 'prerelease'];

describe('material-ui', () => {
  it('should have exports', () => {
    expect(typeof MaterialUI).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(MaterialUI)
      .filter((exportKey) => !versionExports.includes(exportKey))
      .forEach((exportKey) => expect(Boolean(MaterialUI[exportKey])).to.equal(true));
  });

  it('should reexport certain members from @mui/base', () => {
    const expectedReexports = [
      'ClickAwayListener',
      'generateUtilityClass',
      'generateUtilityClasses',
      'NoSsr',
      'Portal',
      'TextareaAutosize',
      'unstable_composeClasses',
    ];

    const exportedNames = Object.keys(MaterialUI);

    expectedReexports.forEach((reexport) => expect(exportedNames).to.contain(reexport));
  });

  describe('index files', () => {
    // Folders that are only meant to be imported by path
    const notExported = [
      'DefaultPropsProvider',
      'OverridableComponent',
      'PigmentContainer',
      'PigmentGrid',
      'PigmentStack',
    ];

    const componentFolders = Object.keys(import.meta.glob('./[A-Z]*/index.{js,ts}')).map(
      (file) => file.split('/')[1],
    );

    const indexSources = import.meta.glob(['./index.js', './index.d.ts'], {
      query: '?raw',
      import: 'default',
      eager: true,
    });

    function getReexportedPaths(source) {
      return [...new Set(Array.from(source.matchAll(/from '(\.\/[^']+)'/g), (match) => match[1]))];
    }

    it('should export every component folder', () => {
      const missing = componentFolders.filter(
        (folder) => !notExported.includes(folder) && !(folder in MaterialUI),
      );

      expect(missing).to.deep.equal([]);
    });

    it('should reexport the same modules in index.js and index.d.ts', () => {
      expect(getReexportedPaths(indexSources['./index.d.ts']).sort()).to.deep.equal(
        getReexportedPaths(indexSources['./index.js']).sort(),
      );
    });
  });
});
