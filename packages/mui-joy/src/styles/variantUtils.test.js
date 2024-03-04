import { expect } from 'chai';
import { isVariantPalette, createVariantStyle, createVariant } from './variantUtils';
import { createGetCssVar } from './extendTheme';

describe('variant utils', () => {
  it('isVariantPalette', () => {
    expect(
      isVariantPalette({
        100: '',
        200: '',
      }),
    ).to.equal(false);
    expect(isVariantPalette({ plain: '' })).to.equal(false);

    expect(isVariantPalette({ plainColor: '' })).to.equal(true);
    expect(isVariantPalette({ plainHoverColor: '' })).to.equal(true);
    expect(isVariantPalette({ plainActiveColor: '' })).to.equal(true);
    expect(isVariantPalette({ plainDisabledColor: '' })).to.equal(true);
    expect(isVariantPalette({ softBg: '' })).to.equal(true);
    expect(isVariantPalette({ softHoverBg: '' })).to.equal(true);
    expect(isVariantPalette({ softActiveBg: '' })).to.equal(true);
    expect(isVariantPalette({ softDisabledBg: '' })).to.equal(true);
    expect(isVariantPalette({ solidBg: '' })).to.equal(true);
    expect(isVariantPalette({ solidHoverBg: '' })).to.equal(true);
    expect(isVariantPalette({ solidActiveBg: '' })).to.equal(true);
    expect(isVariantPalette({ solidDisabledBg: '' })).to.equal(true);
    expect(isVariantPalette({ outlinedBorder: '' })).to.equal(true);
    expect(isVariantPalette({ outlinedHoverBorder: '' })).to.equal(true);
    expect(isVariantPalette({ outlinedActiveBorder: '' })).to.equal(true);
    expect(isVariantPalette({ outlinedDisabledBorder: '' })).to.equal(true);
  });

  describe('initial state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('any', {
          anyColor: 'var(--any-token)',
        }),
      ).to.deep.include({
        '--variant-borderWidth': '0px',
        color: 'var(--any-token)',
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('any', {
          anyBg: 'var(--any-token)',
        }),
      ).to.deep.include({
        '--variant-borderWidth': '0px',
        backgroundColor: 'var(--any-token)',
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('any', {
          anyBorder: 'var(--any-token)',
        }),
      ).to.deep.include({
        '--variant-borderWidth': '1px',
        border: 'var(--variant-borderWidth) solid',
        borderColor: 'var(--any-token)',
      });
    });
  });

  describe('hover state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('anyHover', {
          anyHoverColor: 'var(--any-token)',
        }),
      ).to.deep.include({
        color: 'var(--any-token)',
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('anyHover', {
          anyHoverBg: 'var(--any-token)',
        }),
      ).to.deep.include({
        backgroundColor: 'var(--any-token)',
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('anyHover', {
          anyHoverBorder: 'var(--any-token)',
        }),
      ).to.deep.include({
        borderColor: 'var(--any-token)',
      });
    });
  });

  describe('active state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('anyActive', {
          anyActiveColor: 'var(--any-token)',
        }),
      ).to.deep.include({
        color: 'var(--any-token)',
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('anyActive', {
          anyActiveBg: 'var(--any-token)',
        }),
      ).to.deep.include({
        backgroundColor: 'var(--any-token)',
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('anyActive', {
          anyActiveBorder: 'var(--any-token)',
        }),
      ).to.deep.include({
        borderColor: 'var(--any-token)',
      });
    });
  });

  describe('disabled state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('anyDisabled', {
          anyDisabledColor: 'var(--any-token)',
        }),
      ).to.deep.include({
        color: 'var(--any-token)',
        pointerEvents: 'none',
        cursor: 'default',
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('anyDisabled', {
          anyDisabledBg: 'var(--any-token)',
        }),
      ).to.deep.include({
        backgroundColor: 'var(--any-token)',
        pointerEvents: 'none',
        cursor: 'default',
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('anyDisabled', {
          anyDisabledBorder: 'var(--any-token)',
        }),
      ).to.deep.include({
        borderColor: 'var(--any-token)',
        pointerEvents: 'none',
        cursor: 'default',
      });
    });
  });

  it('should have --variant-borderWidth to initial states even without border token', () => {
    const vars = {
      anyColor: 'var(--any-token)',
      anyBg: 'var(--any-token)',
      anyHoverColor: 'var(--any-token)',
      anyHoverBg: 'var(--any-token)',
      anyActiveColor: 'var(--any-token)',
      anyActiveBg: 'var(--any-token)',
      anyDisabledColor: 'var(--any-token)',
      anyDisabledBg: 'var(--any-token)',
    };
    expect(createVariantStyle('any', vars)).to.deep.equal({
      '--variant-borderWidth': '0px',
      color: 'var(--any-token)',
      backgroundColor: 'var(--any-token)',
    });
  });

  it('should create a variant with all states', () => {
    const vars = {
      outlinedColor: 'var(--any-token)',
      outlinedBorderColor: 'var(--any-token)',
      outlinedBg: 'var(--any-token)',
      outlinedHoverColor: 'var(--any-token)',
      outlinedHoverBorder: 'var(--any-token)',
      outlinedHoverBg: 'var(--any-token)',
      outlinedActiveColor: 'var(--any-token)',
      outlinedActiveBorder: 'var(--any-token)',
      outlinedActiveBg: 'var(--any-token)',
      outlinedDisabledColor: 'var(--any-token)',
      outlinedDisabledBorder: 'var(--any-token)',
      outlinedDisabledBg: 'var(--any-token)',
    };
    expect({
      outlined: {
        primary: createVariantStyle('outlined', vars),
      },
      outlinedHover: {
        primary: createVariantStyle('outlinedHover', vars),
      },
      outlinedActive: {
        primary: createVariantStyle('outlinedActive', vars),
      },
      outlinedDisabled: {
        primary: createVariantStyle('outlinedDisabled', vars),
      },
    }).to.deep.equal({
      outlined: {
        primary: {
          color: 'var(--any-token)',
          '--variant-borderWidth': '1px',
          border: 'var(--variant-borderWidth) solid',
          borderColor: 'var(--any-token)',
          backgroundColor: 'var(--any-token)',
        },
      },
      outlinedHover: {
        primary: {
          color: 'var(--any-token)',
          borderColor: 'var(--any-token)',
          backgroundColor: 'var(--any-token)',
        },
      },
      outlinedActive: {
        primary: {
          color: 'var(--any-token)',
          borderColor: 'var(--any-token)',
          backgroundColor: 'var(--any-token)',
        },
      },
      outlinedDisabled: {
        primary: {
          '--Icon-color': 'currentColor',
          color: 'var(--any-token)',
          borderColor: 'var(--any-token)',
          backgroundColor: 'var(--any-token)',
          pointerEvents: 'none',
          cursor: 'default',
        },
      },
    });
  });

  it('should not include invalid value to variant', () => {
    expect(
      createVariantStyle('plain', {
        plainColor: 'var(--any-token)',
        plainHoverColor: '',
        plainActiveColor: null,
        plainDisabledColor: undefined,
      }),
    ).to.deep.equal({
      '--variant-borderWidth': '0px',
      color: 'var(--any-token)',
    });
  });

  it('create correct context color for plain variant', () => {
    const vars = {
      plainColor: 'var(--joy-variant-plainColor)',
      plainHoverColor: `var(--joy-variant-plainHoverColor, var(--joy-variant-plainColor))`,
      plainHoverBg: 'var(--joy-variant-plainHoverBg)',
      plainActiveColor: 'var(--joy-variant-plainActiveColor, var(--joy-variant-plainHoverColor))',
      plainDisabledColor: 'var(--joy-variant-plainDisabledColor)',
    };
    expect(createVariantStyle('plain', vars)).to.deep.include({
      color: 'var(--joy-variant-plainColor)',
    });
    expect(createVariantStyle('plainHover', vars)).to.deep.include({
      color: 'var(--joy-variant-plainHoverColor, var(--joy-variant-plainColor))',
      backgroundColor: 'var(--joy-variant-plainHoverBg)',
    });
    expect(createVariantStyle('plainActive', vars)).to.deep.include({
      color: 'var(--joy-variant-plainActiveColor, var(--joy-variant-plainHoverColor))',
    });
    expect(createVariantStyle('plainDisabled', vars)).to.deep.include({
      pointerEvents: 'none',
      cursor: 'default',
      color: 'var(--joy-variant-plainDisabledColor)',
    });
  });

  describe('createVariant', () => {
    it('should create style with properties from palette with default value', () => {
      const result = createVariant('outlinedActive', {
        getCssVar: createGetCssVar('joy'),
        palette: {
          primary: {
            outlinedActiveBorder: '#aaa',
            outlinedActiveBg: null, // background-color will not be created
          },
        },
      });
      expect(result.primary).to.deep.include({
        borderColor:
          'var(--variant-outlinedActiveBorder, var(--joy-palette-primary-outlinedActiveBorder, #aaa))',
      });
    });

    it('automatically create variant style if the variable is in the correct format', () => {
      const theme = {
        getCssVar: createGetCssVar('joy'),
        palette: {
          customColor: {
            softColor: '#aaa',
            softBg: '#bbb',
            softHoverColor: '#ccc',
          },
        },
      };
      const softResult = createVariant('soft', theme);
      expect(softResult.customColor).to.deep.include({
        color: 'var(--variant-softColor, var(--joy-palette-customColor-softColor, #aaa))',
        backgroundColor: 'var(--variant-softBg, var(--joy-palette-customColor-softBg, #bbb))',
      });

      const softHoverResult = createVariant('softHover', theme);
      expect(softHoverResult.customColor).to.deep.include({
        color: 'var(--variant-softHoverColor, var(--joy-palette-customColor-softHoverColor, #ccc))',
      });
    });

    it('auto generate "context"', () => {
      expect(createVariant('plain').context).to.deep.include({
        color: 'var(--variant-plainColor)',
      });
      expect(createVariant('outlined').context).to.deep.include({
        color: 'var(--variant-outlinedColor)',
        '--variant-borderWidth': '1px',
        border: 'var(--variant-borderWidth) solid',
        borderColor: 'var(--variant-outlinedBorder)',
      });
      expect(createVariant('soft').context).to.deep.include({
        color: 'var(--variant-softColor)',
        backgroundColor: 'var(--variant-softBg)',
      });
      expect(createVariant('solid').context).to.deep.include({
        backgroundColor: 'var(--variant-solidBg)',
      });
    });
  });
});
