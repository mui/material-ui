import { expect } from 'chai';
import getJsxPreview from './getJsxPreview';

describe('getJsxPreview', () => {
  it('should extract a preview', () => {
    expect(
      getJsxPreview(`
import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function HalfRating() {
  return <Rating name="half-rating" value={2.5} precision={0.5} />;
}
    `),
    ).to.equal(`<Rating name="half-rating" value={2.5} precision={0.5} />
`);
  });
});
