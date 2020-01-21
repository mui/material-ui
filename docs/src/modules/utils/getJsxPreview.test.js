import { expect } from 'chai';
import getJsxPreview from './getJsxPreview';

describe('getJsxPreview', () => {
  it('should extract one-line a preview', () => {
    expect(
      getJsxPreview(
        `
import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default function HalfRating() {
  return <Rating name="half-rating" value={2.5} precision={0.5} />;
}
`,
        true,
      ),
    ).to.equal(`<Rating name="half-rating" value={2.5} precision={0.5} />
`);
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
      ),
    ).to.equal(`<ThemeProvider theme={theme}>
  <MyComponent />
</ThemeProvider>
`);
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
      ),
    ).to.equal(`<MyComponent />
`);
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
      ),
    ).to.equal(`
export function UseWidth() {
  return ( <MyComponent />;
}

`);
  });
});
