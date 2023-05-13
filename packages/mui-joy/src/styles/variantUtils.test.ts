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
    it('should create plain style', () => {
      expect(
        createVariants(
          {
            primary: {
              plainColor: `var(--joy-palette-primary-600)`,
              plainHoverBg: `var(--joy-palette-primary-100)`,
              plainActiveBg: `var(--joy-palette-primary-200)`,
              plainDisabledColor: `var(--joy-palette-primary-200)`,
            },
          },
          createGetCssVar(''),
        ),
      ).to.deep.equal({
        plain: {
          primary: {
            '--variant-borderWidth': '0px',
            color: 'var(--palette-primary-plainColor)',
          },
        },
        plainActive: {
          primary: {
            backgroundColor: 'var(--palette-primary-plainActiveBg)',
          },
        },
        plainDisabled: {
          primary: {
            color: 'var(--palette-primary-plainDisabledColor)',
            cursor: 'default',
            pointerEvents: 'none',
          },
        },
        plainHover: {
          primary: {
            backgroundColor: 'var(--palette-primary-plainHoverBg)',
          },
        },
      });
    });

    it('should create plain style with default values', () => {
      expect(
        createVariants(
          {
            primary: {
              100: '100',
              200: '200',
              600: '600',
              plainColor: `var(--joy-palette-primary-600)`,
              plainHoverBg: `var(--joy-palette-primary-100)`,
              plainActiveBg: `var(--joy-palette-primary-200)`,
              plainDisabledColor: `var(--joy-palette-primary-200)`,
            },
          },
          createGetCssVar(''),
        ),
      ).to.deep.equal({
        plain: {
          primary: {
            '--variant-borderWidth': '0px',
            color: 'var(--palette-primary-plainColor, 600)',
          },
        },
        plainActive: {
          primary: {
            backgroundColor: 'var(--palette-primary-plainActiveBg, 200)',
          },
        },
        plainDisabled: {
          primary: {
            color: 'var(--palette-primary-plainDisabledColor, 200)',
            cursor: 'default',
            pointerEvents: 'none',
          },
        },
        plainHover: {
          primary: {
            backgroundColor: 'var(--palette-primary-plainHoverBg, 100)',
          },
        },
      });
    });
  });
});
