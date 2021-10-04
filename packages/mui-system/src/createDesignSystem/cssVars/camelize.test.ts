import { expect } from 'chai';
import camelize from './camelize';

describe('camelize', () => {
  it('support kebab-case', () => {
    expect(camelize('color-scheme')).to.be('colorScheme');
  });
});
