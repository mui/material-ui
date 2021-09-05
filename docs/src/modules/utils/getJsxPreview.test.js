import { expect } from 'chai';
import getJsxPreview from './getJsxPreview';

describe('getJsxPreview', () => {
  it('should extract one-line a preview', () => {
    expect(
      getJsxPreview(
        `
import * as React from 'react';
import Rating from '@mui/material/Rating';

export default function HalfRating() {
  return <Rating name="half-rating" value={2.5} precision={0.5} />;
}
`,
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
      ),
    ).to.equal(`
export function UseWidth() {
  return ( <MyComponent />;
}

`);
  });

  it('should ignore the wrapping div, Box, or Stack', () => {
    expect(
      getJsxPreview(
        `
export default function HalfRating() {
  return (
    <Stack>
      <Rating />
    </Stack>
  );
}
`,
      ),
    ).to.equal(`<Rating />
`);
  });

  it('should ignore sx prop', () => {
    expect(
      getJsxPreview(`
export default function SlideFromContainer() {
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box
      sx={{
        height: 180,
        width: 240,
        display: 'flex',
        padding: 2,
        borderRadius: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
        overflow: 'hidden',
      }}
      ref={containerRef}
    >
      <Box sx={{ width: 200 }}>
        <Slide />
      </Box>
    </Box>
  );
}
    `),
    ).to.equal(`<Box sx={{ width: 200 }}>
  <Slide />
</Box>
`);
  });
});
