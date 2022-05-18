import { expect } from 'chai';
import sinon from 'sinon';
import {
  isVariantPalette,
  createVariantStyle,
  createVariant,
  createContainedOverrides,
} from './variantUtils';

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
        createVariantStyle('plain', {
          plainColor: 'var(--any-token)',
        }),
      ).to.deep.equal({
        color: 'var(--any-token)',
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('soft', {
          softBg: 'var(--any-token)',
        }),
      ).to.deep.equal({
        backgroundColor: 'var(--any-token)',
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('outlined', {
          outlinedBorder: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '--variant-outlinedBorderWidth': '1px',
        border: 'var(--variant-outlinedBorderWidth) solid',
        borderColor: 'var(--any-token)',
      });
    });
  });

  describe('hover state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('plainHover', {
          plainHoverColor: 'var(--any-token)',
        }),
      ).to.deep.equal({
        cursor: 'pointer',
        '&:hover': {
          color: 'var(--any-token)',
        },
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('softHover', {
          softHoverBg: 'var(--any-token)',
        }),
      ).to.deep.equal({
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'var(--any-token)',
        },
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('outlinedHover', {
          outlinedHoverBorder: 'var(--any-token)',
        }),
      ).to.deep.equal({
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'var(--any-token)',
        },
      });
    });
  });

  describe('active state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('plainActive', {
          plainActiveColor: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&:active': {
          color: 'var(--any-token)',
        },
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('softActive', {
          softActiveBg: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&:active': {
          backgroundColor: 'var(--any-token)',
        },
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('outlinedActive', {
          outlinedActiveBorder: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&:active': {
          borderColor: 'var(--any-token)',
        },
      });
    });
  });

  describe('disabled state', () => {
    it('[color] should create a variant', () => {
      expect(
        createVariantStyle('plainDisabled', {
          plainDisabledColor: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&.Mui-disabled': {
          color: 'var(--any-token)',
          pointerEvents: 'none',
          cursor: 'default',
        },
      });
    });

    it('[bg] should create a variant', () => {
      expect(
        createVariantStyle('softDisabled', {
          softDisabledBg: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&.Mui-disabled': {
          backgroundColor: 'var(--any-token)',
          pointerEvents: 'none',
          cursor: 'default',
        },
      });
    });

    it('[border] should create a variant', () => {
      expect(
        createVariantStyle('outlinedDisabled', {
          outlinedDisabledBorder: 'var(--any-token)',
        }),
      ).to.deep.equal({
        '&.Mui-disabled': {
          borderColor: 'var(--any-token)',
          pointerEvents: 'none',
          cursor: 'default',
        },
      });
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
          '--variant-outlinedBorderWidth': '1px',
          border: 'var(--variant-outlinedBorderWidth) solid',
          borderColor: 'var(--any-token)',
          backgroundColor: 'var(--any-token)',
        },
      },
      outlinedHover: {
        primary: {
          cursor: 'pointer',
          '&:hover': {
            color: 'var(--any-token)',
            borderColor: 'var(--any-token)',
            backgroundColor: 'var(--any-token)',
          },
        },
      },
      outlinedActive: {
        primary: {
          '&:active': {
            color: 'var(--any-token)',
            borderColor: 'var(--any-token)',
            backgroundColor: 'var(--any-token)',
          },
        },
      },
      outlinedDisabled: {
        primary: {
          '&.Mui-disabled': {
            color: 'var(--any-token)',
            borderColor: 'var(--any-token)',
            backgroundColor: 'var(--any-token)',
            pointerEvents: 'none',
            cursor: 'default',
          },
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
    expect(createVariantStyle('plain', vars)).to.deep.equal({
      color: 'var(--joy-variant-plainColor)',
    });
    expect(createVariantStyle('plainHover', vars)).to.deep.equal({
      cursor: 'pointer',
      '&:hover': {
        color: 'var(--joy-variant-plainHoverColor, var(--joy-variant-plainColor))',
        backgroundColor: 'var(--joy-variant-plainHoverBg)',
      },
    });
    expect(createVariantStyle('plainActive', vars)).to.deep.equal({
      '&:active': {
        color: 'var(--joy-variant-plainActiveColor, var(--joy-variant-plainHoverColor))',
      },
    });
    expect(createVariantStyle('plainDisabled', vars)).to.deep.equal({
      '&.Mui-disabled': {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--joy-variant-plainDisabledColor)',
      },
    });
  });

  describe('createVariant', () => {
    it('should only create style with properties from palette variables', () => {
      const result = createVariant('outlinedActive', {
        palette: {
          primary: {
            outlinedActiveBorder: 'some-color',
            outlinedActiveBg: null, // background-color will not be created
          },
        },
        vars: {
          palette: {
            primary: {
              outlinedActiveBorder: 'var(--any-token)',
              outlinedActiveBg: 'var(--any-token)',
            },
          },
        },
      });
      expect(result.primary).to.deep.equal({
        '&:active': {
          borderColor: 'var(--any-token)',
        },
      });
    });

    it('automatically create variant style if the variable is in the correct format', () => {
      const theme = {
        palette: {
          customColor: {
            softColor: 'some-color',
            softBg: 'some-color',
            softHoverColor: 'some-color',
          },
        },
        vars: {
          palette: {
            customColor: {
              softColor: 'var(--any-token)',
              softBg: 'var(--any-token)',
              softHoverColor: 'var(--any-token)',
            },
          },
        },
      };
      const softResult = createVariant('soft', theme);
      expect(softResult.customColor).to.deep.equal({
        color: 'var(--any-token)',
        backgroundColor: 'var(--any-token)',
      });

      const softHoverResult = createVariant('softHover', theme);
      expect(softHoverResult.customColor).to.deep.equal({
        cursor: 'pointer',
        '&:hover': {
          color: 'var(--any-token)',
        },
      });
    });

    it('auto generate "context"', () => {
      expect(createVariant('plain').context).to.deep.equal({
        color: 'var(--variant-plainColor)',
      });
      expect(createVariant('outlined').context).to.deep.equal({
        color: 'var(--variant-outlinedColor)',
        '--variant-outlinedBorderWidth': '1px',
        border: 'var(--variant-outlinedBorderWidth) solid',
        borderColor: 'var(--variant-outlinedBorder)',
      });
      expect(createVariant('soft').context).to.deep.equal({
        color: 'var(--variant-softColor)',
        backgroundColor: 'var(--variant-softBg)',
      });
      expect(createVariant('solid').context).to.deep.equal({
        backgroundColor: 'var(--variant-solidBg)',
      });
    });
  });

  describe('createContainedOverrides', () => {
    it('automatically create solid overrides if the variable is in the correct format', () => {
      const result = createContainedOverrides({
        prefix: 'foo',
        palette: {
          primary: {
            plainColor: '',
          },
          secondary: {
            softBg: '',
          },
          alternate: {
            solidBg: '',
          },
        },
      });
      // partially check the result
      sinon.assert.match(result, {
        primary: {
          '--foo-palette-text-primary': '#fff',
          '--variant-plainColor': 'var(--foo-palette-primary-100)',
        },
        secondary: {
          '--foo-palette-text-secondary': 'var(--foo-palette-secondary-100)',
          '--variant-softBg': 'rgba(255 255 255 / 0.12)',
        },
        alternate: {
          '--foo-palette-text-tertiary': 'var(--foo-palette-alternate-200)',
          '--variant-solidBg': 'var(--foo-palette-alternate-700, rgba(0 0 0 / 0.16))',
        },
      });
    });
  });
});
