import { describe, it, expect } from 'vitest';
import { getCssLayer, getCssLayerOrderStatement, wrapInCssLayer } from './cssLayers';

describe('getCssLayer', () => {
  it('returns the sub-layer', () => {
    expect(getCssLayer({ cssLayers: true }, 'sx')).to.equal('mui.sx');
  });

  it('returns the mui layer for every sub-layer with cssLayers: single', () => {
    expect(getCssLayer({ cssLayers: 'single' }, 'global')).to.equal('mui');
    expect(getCssLayer({ cssLayers: 'single' }, 'sx')).to.equal('mui');
  });

  it('returns undefined when layers are off', () => {
    expect(getCssLayer({ cssLayers: false }, 'sx')).to.equal(undefined);
    expect(getCssLayer({}, 'sx')).to.equal(undefined);
  });
});

describe('getCssLayerOrderStatement', () => {
  it('declares the sub-layers', () => {
    expect(getCssLayerOrderStatement({ cssLayers: true })).to.equal(
      '@layer mui.global, mui.components, mui.theme, mui.custom, mui.sx;',
    );
  });

  it('puts the sub-layers in place of mui in a modularCssLayers string', () => {
    expect(
      getCssLayerOrderStatement({ modularCssLayers: '@layer base, mui, utilities;' }),
    ).to.equal(
      '@layer base, mui.global, mui.components, mui.theme, mui.custom, mui.sx, utilities;',
    );
  });

  it('declares nothing with cssLayers: single, unless there is a modularCssLayers string', () => {
    expect(getCssLayerOrderStatement({ cssLayers: 'single' })).to.equal('');
    expect(
      getCssLayerOrderStatement({
        cssLayers: 'single',
        modularCssLayers: '@layer base, mui, utilities;',
      }),
    ).to.equal('@layer base, mui, utilities;');
  });

  it('declares nothing when layers are off', () => {
    expect(getCssLayerOrderStatement({ cssLayers: false })).to.equal('');
  });
});

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
