import { describe, it, expect } from 'vitest';
import {
  getCssLayer,
  getCssLayerOrderStatement,
  resolveModularCssLayers,
  wrapInCssLayer,
} from './cssLayers';

describe('getCssLayer', () => {
  it('returns the sub-layer', () => {
    expect(getCssLayer({ modularCssLayers: true }, 'sx')).to.equal('mui.sx');
    expect(getCssLayer({ modularCssLayers: '@layer base, mui;' }, 'sx')).to.equal('mui.sx');
  });

  it('returns the mui layer for every sub-layer with modularCssLayers: false', () => {
    expect(getCssLayer({ modularCssLayers: false }, 'global')).to.equal('mui');
    expect(getCssLayer({ modularCssLayers: false }, 'sx')).to.equal('mui');
  });

  it('returns undefined for a theme without modularCssLayers', () => {
    expect(getCssLayer({}, 'sx')).to.equal(undefined);
    expect(getCssLayer(undefined, 'sx')).to.equal(undefined);
  });
});

describe('getCssLayerOrderStatement', () => {
  it('declares the sub-layers', () => {
    expect(getCssLayerOrderStatement({ modularCssLayers: true })).to.equal(
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

  it('declares nothing with modularCssLayers: false', () => {
    expect(getCssLayerOrderStatement({ modularCssLayers: false })).to.equal('');
  });

  it('declares nothing for a theme without modularCssLayers', () => {
    expect(getCssLayerOrderStatement({})).to.equal('');
  });
});

describe('resolveModularCssLayers', () => {
  it('uses sub-layers by default', () => {
    expect(resolveModularCssLayers(undefined)).to.equal(true);
    expect(resolveModularCssLayers(true)).to.equal(true);
  });

  it('keeps false and strings', () => {
    expect(resolveModularCssLayers(false)).to.equal(false);
    expect(resolveModularCssLayers('@layer base, mui;')).to.equal('@layer base, mui;');
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

  it('keeps a comment before an @import or a layer order statement with it, at the top level', () => {
    expect(
      wrapInCssLayer('/* vendor */ @import url("a.css");html{color:red;}', 'mui.global'),
    ).to.equal('/* vendor */ @import url("a.css");@layer mui.global{html{color:red;}}');
    expect(
      wrapInCssLayer('/* order */\n@layer theme, base, mui;\nhtml{color:red;}', 'mui.global'),
    ).to.equal('/* order */\n@layer theme, base, mui;@layer mui.global{\nhtml{color:red;}}');
  });

  it('keeps comments between wrapped rules in the layer, and trailing comments out of it', () => {
    expect(wrapInCssLayer('a{color:red;}/* b */b{color:blue;}/* end */', 'mui.global')).to.equal(
      '@layer mui.global{a{color:red;}/* b */b{color:blue;}}/* end */',
    );
    expect(wrapInCssLayer(' /* only a comment */ ', 'mui.global')).to.equal(
      ' /* only a comment */ ',
    );
  });

  it('keeps a comment inside a rule in the rule', () => {
    expect(wrapInCssLayer('a /* x */ {color:red;}', 'mui.global')).to.equal(
      '@layer mui.global{a /* x */ {color:red;}}',
    );
    expect(wrapInCssLayer('@import /* x */ url("a.css");', 'mui.global')).to.equal(
      '@import /* x */ url("a.css");',
    );
  });

  it('ignores braces and semicolons in strings, comments and escapes', () => {
    const css = 'a::before{content:"}{;";}/* } @layer x{ */b{color:red;}.c\\{{color:blue;}';
    expect(wrapInCssLayer(css, 'mui.global')).to.equal(`@layer mui.global{${css}}`);
  });
});
