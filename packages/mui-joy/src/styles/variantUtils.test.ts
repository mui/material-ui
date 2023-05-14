import sinon from 'sinon';
import { expect } from 'chai';
import { isVariantPalette, createVariants } from './variantUtils';
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

  describe('createVariants', () => {
    it('should create context style', () => {
      expect(createVariants({}, createGetCssVar(''))).to.deep.equal({
        plain: {
          context: {
            '--variant-borderWidth': '0px',
            color: 'var(--variant-plainColor)',
          },
        },
        plainHover: {
          context: {
            color: 'var(--variant-plainHoverColor)',
            backgroundColor: 'var(--variant-plainHoverBg)',
          },
        },
        plainActive: { context: { backgroundColor: 'var(--variant-plainActiveBg)' } },
        plainDisabled: {
          context: {
            pointerEvents: 'none',
            cursor: 'default',
            color: 'var(--variant-plainDisabledColor)',
          },
        },
        outlined: {
          context: {
            '--variant-borderWidth': '1px',
            color: 'var(--variant-outlinedColor)',
            border: 'var(--variant-borderWidth) solid',
            borderColor: 'var(--variant-outlinedBorder)',
          },
        },
        outlinedHover: {
          context: {
            color: 'var(--variant-outlinedHoverColor)',
            borderColor: 'var(--variant-outlinedHoverBorder)',
            backgroundColor: 'var(--variant-outlinedHoverBg)',
          },
        },
        outlinedActive: { context: { backgroundColor: 'var(--variant-outlinedActiveBg)' } },
        outlinedDisabled: {
          context: {
            pointerEvents: 'none',
            cursor: 'default',
            color: 'var(--variant-outlinedDisabledColor)',
            borderColor: 'var(--variant-outlinedDisabledBorder)',
          },
        },
        soft: {
          context: {
            '--variant-borderWidth': '0px',
            color: 'var(--variant-softColor)',
            backgroundColor: 'var(--variant-softBg)',
          },
        },
        softHover: {
          context: {
            color: 'var(--variant-softHoverColor)',
            backgroundColor: 'var(--variant-softHoverBg)',
          },
        },
        softActive: { context: { backgroundColor: 'var(--variant-softActiveBg)' } },
        softDisabled: {
          context: {
            pointerEvents: 'none',
            cursor: 'default',
            color: 'var(--variant-softDisabledColor)',
            backgroundColor: 'var(--variant-softDisabledBg)',
          },
        },
        solid: {
          context: {
            '--variant-borderWidth': '0px',
            color: 'var(--variant-solidColor)',
            backgroundColor: 'var(--variant-solidBg)',
          },
        },
        solidHover: {
          context: {
            color: 'var(--variant-solidHoverColor)',
            backgroundColor: 'var(--variant-solidHoverBg)',
          },
        },
        solidActive: { context: { backgroundColor: 'var(--variant-solidActiveBg)' } },
        solidDisabled: {
          context: {
            pointerEvents: 'none',
            cursor: 'default',
            color: 'var(--variant-solidDisabledColor)',
            backgroundColor: 'var(--variant-solidDisabledBg)',
          },
        },
      });
    });

    it('should create plain style', () => {
      const result = createVariants(
        {
          primary: {
            plainColor: `var(--joy-palette-primary-600)`,
            plainHoverBg: `var(--joy-palette-primary-100)`,
            plainActiveBg: `var(--joy-palette-primary-200)`,
            plainDisabledColor: `var(--joy-palette-primary-200)`,
          },
        },
        createGetCssVar(''),
      );
      sinon.assert.match(result, {
        plain: {
          primary: {
            '--variant-borderWidth': '0px',
            color: 'var(--palette-primary-plainColor, var(--joy-palette-primary-600))',
          },
        },
      });
      sinon.assert.match(result, {
        plainActive: {
          primary: {
            backgroundColor: 'var(--palette-primary-plainActiveBg, var(--joy-palette-primary-200))',
          },
        },
      });
      sinon.assert.match(result, {
        plainDisabled: {
          primary: {
            color: 'var(--palette-primary-plainDisabledColor, var(--joy-palette-primary-200))',
            cursor: 'default',
            pointerEvents: 'none',
          },
        },
      });
      sinon.assert.match(result, {
        plainHover: {
          primary: {
            backgroundColor: 'var(--palette-primary-plainHoverBg, var(--joy-palette-primary-100))',
          },
        },
      });
    });
  });
});
