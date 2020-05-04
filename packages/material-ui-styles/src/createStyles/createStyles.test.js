import { expect } from 'chai';
import createStyles from './createStyles';

describe('createStyles', () => {
  it('is the identity function', () => {
    const styles = {};
    expect(createStyles(styles)).to.equal(styles);
  });
});
