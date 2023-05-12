import { expect } from 'chai';
import { isVariantPalette, createVariantStyle, createVariants } from './variantUtils';
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
      expect(createVariantStyle({}, 'anyColor', 'var(--any-token)')).to.deep.include({
        '--variant-borderWidth': '0px',
        color: 'var(--any-token)',
      });
    });

    it('[bg] should create a variant', () => {
      expect(createVariantStyle({}, 'anyBg', 'var(--any-token)')).to.deep.include({
        '--variant-borderWidth': '0px',
        backgroundColor: 'var(--any-token)',
      });
    });

    it('[border] should create a variant', () => {
      expect(createVariantStyle({}, 'anyBorder', 'var(--any-token)')).to.deep.include({
        '--variant-borderWidth': '1px',
        border: 'var(--variant-borderWidth) solid',
        borderColor: 'var(--any-token)',
      });
    });
  });

  describe('hover state', () => {
    it('[color] should create a variant', () => {
      expect(createVariantStyle({}, 'anyHoverColor', 'var(--any-token)')).to.deep.include({
        color: 'var(--any-token)',
      });
    });

    it('[bg] should create a variant', () => {
      expect(createVariantStyle({}, 'anyHoverBg', 'var(--any-token)')).to.deep.include({
        backgroundColor: 'var(--any-token)',
      });
    });

    it('[border] should create a variant', () => {
      expect(createVariantStyle({}, 'anyHoverBorder', 'var(--any-token)')).to.deep.include({
        borderColor: 'var(--any-token)',
      });
    });
  });

  describe('active state', () => {
    it('[color] should create a variant', () => {
      expect(createVariantStyle({}, 'anyActiveColor', 'var(--any-token)')).to.deep.include({
        color: 'var(--any-token)',
      });
    });

    it('[bg] should create a variant', () => {
      expect(createVariantStyle({}, 'anyActiveBg', 'var(--any-token)')).to.deep.include({
        backgroundColor: 'var(--any-token)',
      });
    });

    it('[border] should create a variant', () => {
      expect(createVariantStyle({}, 'anyActiveBorder', 'var(--any-token)')).to.deep.include({
        borderColor: 'var(--any-token)',
      });
    });
  });

  describe('disabled state', () => {
    it('[color] should create a variant', () => {
      expect(createVariantStyle({}, 'anyDisabledColor', 'var(--any-token)')).to.deep.include({
        color: 'var(--any-token)',
        pointerEvents: 'none',
        cursor: 'default',
      });
    });

    it('[bg] should create a variant', () => {
      expect(createVariantStyle({}, 'anyDisabledBg', 'var(--any-token)')).to.deep.include({
        backgroundColor: 'var(--any-token)',
        pointerEvents: 'none',
        cursor: 'default',
      });
    });

    it('[border] should create a variant', () => {
      expect(createVariantStyle({}, 'anyDisabledBorder', 'var(--any-token)')).to.deep.include({
        borderColor: 'var(--any-token)',
        pointerEvents: 'none',
        cursor: 'default',
      });
    });
  });

  it('should have --variant-borderWidth to initial states even without border token', () => {
    const source = {};
    createVariantStyle(source, 'anyColor', 'var(--any-token)');
    createVariantStyle(source, 'anyBg', 'var(--any-token)');
    expect(source).to.deep.equal({
      '--variant-borderWidth': '0px',
      color: 'var(--any-token)',
      backgroundColor: 'var(--any-token)',
    });
  });

  it('should create a variant with all states', () => {
    const source = {
      outlined: { primary: {} },
      outlinedHover: { primary: {} },
      outlinedActive: { primary: {} },
      outlinedDisabled: { primary: {} },
    };
    createVariantStyle(source.outlined.primary, 'outlinedColor', 'var(--any-token)');
    createVariantStyle(source.outlined.primary, 'outlinedBorderColor', 'var(--any-token)');
    createVariantStyle(source.outlined.primary, 'outlinedBg', 'var(--any-token)');

    createVariantStyle(source.outlinedHover.primary, 'outlinedHoverColor', 'var(--any-token)');
    createVariantStyle(source.outlinedHover.primary, 'outlinedHoverBorder', 'var(--any-token)');
    createVariantStyle(source.outlinedHover.primary, 'outlinedHoverBg', 'var(--any-token)');

    createVariantStyle(source.outlinedActive.primary, 'outlinedActiveColor', 'var(--any-token)');
    createVariantStyle(source.outlinedActive.primary, 'outlinedActiveBorder', 'var(--any-token)');
    createVariantStyle(source.outlinedActive.primary, 'outlinedActiveBg', 'var(--any-token)');

    createVariantStyle(
      source.outlinedDisabled.primary,
      'outlinedDisabledColor',
      'var(--any-token)',
    );
    createVariantStyle(
      source.outlinedDisabled.primary,
      'outlinedDisabledBorder',
      'var(--any-token)',
    );
    createVariantStyle(source.outlinedDisabled.primary, 'outlinedDisabledBg', 'var(--any-token)');

    expect(source).to.deep.equal({
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
    const source = {};
    createVariantStyle(source, 'plainColor', 'var(--any-token)');
    createVariantStyle(source, 'plainHoverColor', '');
    createVariantStyle(source, 'plainActiveColor', null);
    createVariantStyle(source, 'plainDisabledColor', undefined);
    expect(source).to.deep.equal({
      '--variant-borderWidth': '0px',
      color: 'var(--any-token)',
    });
  });

  it('create correct context color for plain variant', () => {
    const source = {
      plain: {},
      plainHover: {},
      plainActive: {},
      plainDisabled: {},
    };
    createVariantStyle(source.plain, 'plainColor', 'var(--joy-variant-plainColor)');
    createVariantStyle(
      source.plainHover,
      'plainHoverColor',
      'var(--joy-variant-plainHoverColor, var(--joy-variant-plainColor))',
    );
    createVariantStyle(source.plainHover, 'plainHoverBg', 'var(--joy-variant-plainHoverBg)');
    createVariantStyle(
      source.plainActive,
      'plainActiveColor',
      'var(--joy-variant-plainActiveColor, var(--joy-variant-plainHoverColor))',
    );
    createVariantStyle(
      source.plainDisabled,
      'plainDisabledColor',
      'var(--joy-variant-plainDisabledColor)',
    );

    expect(source.plain).to.deep.include({
      color: 'var(--joy-variant-plainColor)',
    });
    expect(source.plainHover).to.deep.include({
      color: 'var(--joy-variant-plainHoverColor, var(--joy-variant-plainColor))',
      backgroundColor: 'var(--joy-variant-plainHoverBg)',
    });
    expect(source.plainActive).to.deep.include({
      color: 'var(--joy-variant-plainActiveColor, var(--joy-variant-plainHoverColor))',
    });
    expect(source.plainDisabled).to.deep.include({
      pointerEvents: 'none',
      cursor: 'default',
      color: 'var(--joy-variant-plainDisabledColor)',
    });
  });

  describe('createVariants', () => {
    it('should create plain style', () => {
      const color = '#054DA7';
      const hoverBg = '#f9f9f9';
      const disabledColor = '#e5e5e5';
      const result = createVariants(
        {
          primary: {
            600: color,
            plainColor: `var(--joy-palette-primary-600)`,
            plainHoverBg: `var(--joy-palette-neutral-100)`,
            plainActiveBg: `var(--joy-palette-unknown-100)`,
            plainDisabledColor: `var(--joy-palette-divider)`,
          },
          neutral: {
            100: hoverBg,
          },
          divider: disabledColor,
        },
        'custom',
      );
      expect(result.plain.primary).to.deep.equal({
        '--variant-borderWidth': '0px',
        color: `var(--custom-palette-primary-plainColor, var(--joy-palette-primary-600))`,
      });
      expect(result.plainHover.primary).to.deep.equal({
        backgroundColor: `var(--custom-palette-primary-plainHoverBg, var(--joy-palette-neutral-100))`,
      });
      expect(result.plainActive.primary).to.deep.equal({
        // don't add default value if it could not find from the color palette.
        backgroundColor: `var(--custom-palette-primary-plainActiveBg, var(--joy-palette-unknown-100))`,
      });
      expect(result.plainDisabled.primary).to.deep.equal({
        color: `var(--custom-palette-primary-plainDisabledColor, var(--joy-palette-divider))`,
        cursor: 'default',
        pointerEvents: 'none',
      });
    });

    it('should create plain style with default values', () => {
      const result = createVariants(
        {
          primary: {
            100: '#100',
            200: '#200',
            600: '#600',
            plainColor: `var(--joy-palette-primary-600)`,
            plainHoverBg: `var(--joy-palette-primary-100)`,
            plainActiveBg: `var(--joy-palette-primary-200)`,
            plainDisabledColor: `var(--joy-palette-primary-200)`,
          },
        },
        'custom',
      );
      expect(result.plain.primary).to.deep.equal({
        '--variant-borderWidth': '0px',
        color: 'var(--custom-palette-primary-plainColor, var(--joy-palette-primary-600))',
      });
      expect(result.plainActive.primary).to.deep.equal({
        backgroundColor:
          'var(--custom-palette-primary-plainActiveBg, var(--joy-palette-primary-200))',
      });
      expect(result.plainDisabled.primary).to.deep.equal({
        color: 'var(--custom-palette-primary-plainDisabledColor, var(--joy-palette-primary-200))',
        cursor: 'default',
        pointerEvents: 'none',
      });
      expect(result.plainHover.primary).to.deep.equal({
        backgroundColor:
          'var(--custom-palette-primary-plainHoverBg, var(--joy-palette-primary-100))',
      });
    });

    it('auto generate "context"', () => {
      expect(createVariants({}, createGetCssVar(''))).to.deep.equal({
        outlined: {
          context: {
            '--variant-borderWidth': '1px',
            border: 'var(--variant-borderWidth) solid',
            borderColor: 'var(--variant-outlinedBorder)',
            color: 'var(--variant-outlinedColor)',
          },
        },
        outlinedActive: {
          context: {
            backgroundColor: 'var(--variant-outlinedActiveBg)',
          },
        },
        outlinedDisabled: {
          context: {
            borderColor: 'var(--variant-outlinedDisabledBorder)',
            color: 'var(--variant-outlinedDisabledColor)',
            cursor: 'default',
            pointerEvents: 'none',
          },
        },
        outlinedHover: {
          context: {
            backgroundColor: 'var(--variant-outlinedHoverBg)',
            borderColor: 'var(--variant-outlinedHoverBorder)',
            color: 'var(--variant-outlinedHoverColor)',
          },
        },
        plain: {
          context: {
            '--variant-borderWidth': '0px',
            color: 'var(--variant-plainColor)',
          },
        },
        plainActive: {
          context: {
            backgroundColor: 'var(--variant-plainActiveBg)',
          },
        },
        plainDisabled: {
          context: {
            color: 'var(--variant-plainDisabledColor)',
            cursor: 'default',
            pointerEvents: 'none',
          },
        },
        plainHover: {
          context: {
            backgroundColor: 'var(--variant-plainHoverBg)',
            color: 'var(--variant-plainHoverColor)',
          },
        },
        soft: {
          context: {
            '--variant-borderWidth': '0px',
            backgroundColor: 'var(--variant-softBg)',
            color: 'var(--variant-softColor)',
          },
        },
        softActive: {
          context: {
            backgroundColor: 'var(--variant-softActiveBg)',
          },
        },
        softDisabled: {
          context: {
            backgroundColor: 'var(--variant-softDisabledBg)',
            color: 'var(--variant-softDisabledColor)',
            cursor: 'default',
            pointerEvents: 'none',
          },
        },
        softHover: {
          context: {
            backgroundColor: 'var(--variant-softHoverBg)',
            color: 'var(--variant-softHoverColor)',
          },
        },
        solid: {
          context: {
            '--variant-borderWidth': '0px',
            backgroundColor: 'var(--variant-solidBg)',
            color: 'var(--variant-solidColor)',
          },
        },
        solidActive: {
          context: {
            backgroundColor: 'var(--variant-solidActiveBg)',
          },
        },
        solidDisabled: {
          context: {
            backgroundColor: 'var(--variant-solidDisabledBg)',
            color: 'var(--variant-solidDisabledColor)',
            cursor: 'default',
            pointerEvents: 'none',
          },
        },
        solidHover: {
          context: {
            backgroundColor: 'var(--variant-solidHoverBg)',
            color: 'var(--variant-solidHoverColor)',
          },
        },
      });
    });
  });
});
