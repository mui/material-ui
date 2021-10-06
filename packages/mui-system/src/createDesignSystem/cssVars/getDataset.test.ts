import { expect } from 'chai';
import getDataset from './getDataset';

describe('getDataset', () => {
  it('remove dash', () => {
    expect(getDataset('color-scheme')).to.equal('colorScheme');
  });

  it('remove multiple dashes', () => {
    expect(getDataset('color-scheme-test')).to.equal('colorSchemeTest');
  });

  it('does not replace _ or : or .', () => {
    expect(getDataset('color.Scheme')).to.equal('color.scheme');
    expect(getDataset('color_scheme_test')).to.equal('color_scheme_test');
    expect(getDataset('color:scheme')).to.equal('color:scheme');
  });
});
