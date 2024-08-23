/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import * as MaterialUI from './index';

const versionExports = [
  'version',
  'major',
  'minor',
  'patch',
  'preReleaseLabel',
  'preReleaseNumber',
];

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
});
