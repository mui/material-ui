import { expect } from 'chai';
import breakpoints, { computeBreakpointsBase, resolveBreakpointValues } from './breakpoints';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

describe('breakpoints', () => {
  const themeBreakpoints = { xs: 100, sm: 200, md: 300, lg: 400, xl: 500 };

  it('should work', () => {
    const palette = breakpoints(textColor);

    expect(palette.filterProps.length).to.equal(6);
    expect(
      palette({
        color: 'red',
        sm: {
          color: 'blue',
        },
      }),
    ).to.deep.equal({
      color: 'red',
      '@media (min-width:600px)': {
        color: 'blue',
      },
    });
  });

  describe('function: computeBreakpointsBase', () => {
    it('compute base for breakpoint values of array type', () => {
      const columns = [1, 2, 3];
      const base = computeBreakpointsBase(columns, themeBreakpoints);
      expect(base).to.deep.equal({ xs: true, sm: true, md: true });
    });

    it('compute base for breakpoint values of object type', () => {
      const columns = { xs: 1, sm: 2, md: 3 };
      const base = computeBreakpointsBase(columns, themeBreakpoints);
      expect(base).to.deep.equal({ xs: true, sm: true, md: true });
    });

    it('return empty object for fixed value', () => {
      const columns = 3;
      const base = computeBreakpointsBase(columns, themeBreakpoints);
      expect(base).to.deep.equal({});
    });
  });

  describe('function: resolveBreakpointValues', () => {
    it('resolve breakpoint values for prop of array type', () => {
      const columns = [1, 2, 3];
      const values = resolveBreakpointValues({ values: columns, breakpoints: themeBreakpoints });
      expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3 });
    });

    it('resolve breakpoint values for prop of object type', () => {
      const columns = { xs: 1, sm: 2, md: 3 };
      const values = resolveBreakpointValues({ values: columns, breakpoints: themeBreakpoints });
      expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3 });
    });

    it('resolve breakpoint values for unordered prop of object type', () => {
      const columns = { sm: 2, md: 3, xs: 1 };
      const values = resolveBreakpointValues({ values: columns, breakpoints: themeBreakpoints });
      expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3 });
    });

    it('return prop as it is for prop of fixed value', () => {
      const columns = 3;
      const values = resolveBreakpointValues({ values: columns, breakpoints: themeBreakpoints });
      expect(values).to.equal(3);
    });

    it('resolve breakpoint values for prop of array type given custom base', () => {
      const columns = [1, 2, 3];
      const customBase = { xs: true, sm: true, md: true, lg: true };
      const values = resolveBreakpointValues({ values: columns, base: customBase });
      expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3, lg: 3 });
    });

    it('resolve breakpoint values for prop of object type given custom base', () => {
      const columns = { xs: 1, sm: 2, md: 3 };
      const customBase = { xs: true, sm: true, md: true, lg: true };
      const values = resolveBreakpointValues({ values: columns, base: customBase });
      expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3, lg: 3 });
    });

    it('resolve breakpoint values for unordered prop of object type given custom base', () => {
      const columns = { sm: 2, md: 3, xs: 1 };
      const customBase = { xs: true, sm: true, md: true, lg: true };
      const values = resolveBreakpointValues({ values: columns, base: customBase });
      expect(values).to.deep.equal({ xs: 1, sm: 2, md: 3, lg: 3 });
    });
  });
});
