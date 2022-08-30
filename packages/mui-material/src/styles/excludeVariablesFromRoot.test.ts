import { expect } from 'chai';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';

describe('excludeVariablesFromRoot', () => {
  it('should return true', () => {
    [...Array(25)].forEach((_, index) => {
      if (index !== 0) {
        expect(excludeVariablesFromRoot(`--mui-overlays-${index}`)).to.equal(true);
      }
    });
    expect(excludeVariablesFromRoot(`--mui-palette-AppBar-darkBg`)).to.equal(true);
    expect(excludeVariablesFromRoot(`--mui-palette-AppBar-darkColor`)).to.equal(true);
  });

  it('should return true for custom prefix', () => {
    [...Array(25)].forEach((_, index) => {
      if (index !== 0) {
        expect(excludeVariablesFromRoot(`--foo-bar-overlays-${index}`)).to.equal(true);
      }
    });
    expect(excludeVariablesFromRoot(`--foo-bar-palette-AppBar-darkBg`)).to.equal(true);
    expect(excludeVariablesFromRoot(`--foo-bar-palette-AppBar-darkColor`)).to.equal(true);
  });
});
