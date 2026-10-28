import { describe, it, expect } from 'vitest';
import { wrapInCssLayer } from './cssLayers';

describe('wrapInCssLayer', () => {
  it('wraps the styles in the layer', () => {
    expect(wrapInCssLayer('html{color:red;}', 'mui.global')).to.equal(
      '@layer mui.global{html{color:red;}}',
    );
  });

  it('keeps layer order statements at the top level', () => {
    expect(wrapInCssLayer('@layer theme, base, mui;', 'mui.global')).to.equal(
      '@layer theme, base, mui;',
    );
    expect(wrapInCssLayer('@layer theme, base, mui;html{color:red;}', 'mui.global')).to.equal(
      '@layer theme, base, mui;@layer mui.global{html{color:red;}}',
    );
  });

  it("keeps the app's own layers at the top level, in order", () => {
    expect(
      wrapInCssLayer('a{color:red;}@layer reset{.x{color:blue;}}b{color:green;}', 'mui.global'),
    ).to.equal(
      '@layer mui.global{a{color:red;}}@layer reset{.x{color:blue;}}@layer mui.global{b{color:green;}}',
    );
  });

  it('keeps the at-rules that are invalid inside a layer at the top level', () => {
    expect(
      wrapInCssLayer('@charset "utf-8";@import url("a.css");a{color:red;}', 'mui.global'),
    ).to.equal('@charset "utf-8";@import url("a.css");@layer mui.global{a{color:red;}}');
  });

  it('ignores braces and semicolons in strings, comments and escapes', () => {
    const css = 'a::before{content:"}{;";}/* } @layer x{ */b{color:red;}.c\\{{color:blue;}';
    expect(wrapInCssLayer(css, 'mui.global')).to.equal(`@layer mui.global{${css}}`);
  });
});
