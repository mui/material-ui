import { expect } from 'chai';
import getJsxPreview from './getJsxPreview';

describe('getJsxPreview', () => {
  it('should extract one-line a preview', () => {
    expect(
      getJsxPreview(
        `
import * as React from 'react';
import Rating from '@material-ui/core/Rating';

export default function HalfRating() {
  return <Rating name="half-rating" value={2.5} precision={0.5} />;
}`,
        true,
      )[0],
    ).to.equal(`<Rating name="half-rating" value={2.5} precision={0.5} />`);
  });

  it('should extract a multi-line preview', () => {
    expect(
      getJsxPreview(
        `
export default function UseWidth() {
  return (
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
  );
}
`,
        true,
      )[0],
    ).to.equal(`<ThemeProvider theme={theme}>
  <MyComponent />
</ThemeProvider>`);
  });

  it('should exclude an outer div', () => {
    expect(
      getJsxPreview(
        `
export default function UseWidth() {
  return (
    <div className={classes.root}>
      <MyComponent />
    </div>
  );
}
`,
        true,
      )[0],
    ).to.equal(`<MyComponent />`);
  });

  it('should return all if no match', () => {
    expect(
      getJsxPreview(
        `
export function UseWidth() {
  return ( <MyComponent />;
}
`,
        true,
      )[0],
    ).to.equal(`export function UseWidth() {
  return ( <MyComponent />;
}`);
  });
});
